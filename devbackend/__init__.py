import os
from flask import Flask, request, jsonify
from flask_cognito import CognitoAuth
import datetime as dt
import config
import mysql.connector
import queries


app = Flask(__name__)

app.config.extend({
    'COGNITO_REGION': '',
    'COGNITO_USERPOOL_ID': '',

    # optional# client ID you wish to verify user is authenticated against
    'COGNITO_CHECK_TOKEN_EXPIRATION': True,  # disable token expiration checking for testing purposes
    'COGNITO_JWT_HEADER_NAME': 'Authorization',
    'COGNITO_JWT_HEADER_PREFIX': 'Bearer',
})

auth = CognitoAuth(app)

class APIReceiver:
    def __init__(self, request_args):
        self.authorization = False
        if config.api_key == request_args.get('apikey'):
            self.authorization = True

    def __enter__(self):
        self.conn = mysql.connector.connect(
            host=config.mysql_host,
            user=config.mysql_user,
            password=config.mysql_password,
            database=config.mysql_db
        )
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, etype, value, traceback):
        self.conn.close()

    def query_results(self, query):
        self.cursor.execute(query)
        records = self.cursor.fetchall()
        columns = self.cursor.column_names
        objects = [dict(zip(columns, record)) for record in records]
        return objects

    def push_record(self, query):
        self.cursor.execute(query)
        self.conn.commit()
        return


def get_response(request_args, query, return_as_records=False):
    with APIReceiver(request_args) as api_manager:
        if not api_manager.authorization:
            return jsonify({'resp': 'UNAUTHORIZED'}), 401
        objects = api_manager.query_results(query)
        if return_as_records:
            return objects
        return jsonify(objects), 200


def push_record(request_args, query, return_as_records=False):
    with APIReceiver(request_args) as api_manager:
        if not api_manager.authorization:
            return jsonify({'resp': 'UNAUTHORIZED'}), 401
        api_manager.push_record(query)
        if return_as_records:
            return True
        return jsonify({'resp': 'Success'}), 200


@app.route('/hello')
def hello():
    return 'hello!'


@app.route('/fetchDashboardListings', methods=['POST'])
def fetch_dashboard_listings():
    def deactivate_actions(args, actions, guid):
        actions_to_deactivate = []
        for action in actions:
            if action['active']:
                if      action['expireDT'] < dt.datetime.now() or \
                        action['firstPresentedDT'] < dt.datetime.now() - dt.timedelta(days=14) or \
                        action['status']:
                    actions_to_deactivate.append(action['actionId'])
                    action['active'] = 0
        if actions_to_deactivate:
            push_record(args, queries.pushDeactivateActions(actions_to_deactivate, guid), return_as_records=False)
        return actions

    def get_more_actions(args, actions, user_cause, guid):
        appropriate_cause_count = 0
        previous_actionIds = []
        new_actionIds = []
        exclude_list = []
        while len(new_actionIds + previous_actionIds) < 4:
            easy_action = False
            if actions:
                exclude_list = [action['actionId'] for action in actions]
                for action in actions:
                    if action['active']:
                        previous_actionIds.append(action['actionId'])
                        if action['reward'] < 50:
                            easy_action = True
                        if action['causeTitle'] == user_cause:
                            appropriate_cause_count += 1
            if len(new_actionIds + previous_actionIds) >= 4:
                break
            if not easy_action:
                response = get_response(args, queries.getEasyAction(exclude_list, guid),
                                        return_as_records=True)
                if response:
                    id = response[0]['actionId']
                    new_actionIds.append(id)
                    exclude_list.append(id)
            while appropriate_cause_count < 2:
                response = get_response(args, queries.getUserCausePrefAction(exclude_list, guid, user_cause),
                                        return_as_records=True)
                if response:
                    id = response[0]['actionId']
                    new_actionIds.append(id)
                    exclude_list.append(id)
                appropriate_cause_count += 1

            response = get_response(args, queries.getRandomAction(exclude_list, guid), return_as_records=True)
            if response:
                id = response[0]['actionId']
                new_actionIds.append(id)
                exclude_list.append(id)
        return previous_actionIds, new_actionIds

    def flag_actions_active(args, previous_actionIds, new_actionIds, guid):
        if previous_actionIds:
            push_record(args, queries.updateUserDashActionsStatus(previous_actionIds, dt.datetime.now(), guid))
        for action_Id in new_actionIds:
            push_record(args, queries.pushUserDashActionsStatus(action_Id, dt.datetime.now(), guid))

    guid = request.args['userGuid']
    user_cause = request.args['userCause']

    actions = get_response(request.args, queries.getDashboardActionsForAlgorithm(guid), return_as_records=True)
    actions = deactivate_actions(request.args, actions, guid)
    previous_actionIds, new_actionIds = get_more_actions(request.args, actions, user_cause, guid)
    flag_actions_active(request.args, previous_actionIds, new_actionIds, guid)
    return get_response(request.args, queries.listActionsDashboard(previous_actionIds + new_actionIds))




@app.route('/fetchHiddenActions', methods=['POST'])
def fetch_hidden_actions():
    return get_response(request.args, queries.fetchHiddenActions(request.args['userGuid']))


@app.route('/fetchCompletedActions', methods=['POST'])
def fetch_completed_actions():
    return get_response(request.args, queries.fetchCompletedActions(request.args['userGuid']))


@app.route('/fetchMyActions', methods=['POST'])
def fetch_my_actions():
    return get_response(request.args, queries.fetchMyActions(request.args['userGuid']))


@app.route('/pushNewUserGuid', methods=['POST'])
def push_new_user_guid():
    return push_record(request.args, queries.pushNewUserGuid(request.args['newGuid']))


@app.route('/pushCalcExp', methods=['POST'])
def push_calc_exp():
    guid = request.args['userGuid']
    objects = get_response(request.args, queries.fetchUserLevel(guid), return_as_records=True)
    exp = objects[0]['exp']
    level = objects[0]['level']
    nextLevel = objects[0]['nextLevel']
    totalActions = objects[0]['totalActions']
    previousLevel = objects[0]['previousLevel']
    EcoActions = objects[0]['EcoActions']
    EnvActions = objects[0]['EnvActions']
    JustActions = objects[0]['JustActions']
    EcoExp = objects[0]['EcoExp']
    EnvExp = objects[0]['EnvExp']
    JustExp = objects[0]['JustExp']
    return push_record(request.args, queries.pushCalcExp(exp, level, nextLevel, totalActions, previousLevel, guid,
                            EcoActions, EnvActions, JustActions))


@app.route('/fetchUserExperience', methods=['POST'])
def fetch_user_experience():
    return get_response(request.args, queries.fetchUserExperience(request.args['userGuid']))




@app.route('/pushActionStatus', methods=['POST'])
def push_action_status():
    try:
        user_guid = request.args.get('userGuid')
        status = request.args.get('statusUpdate')
        actionId = request.args.get('actionId')
        objects = get_response(request.args, queries.getUserActions(user_guid), return_as_records=True)
        delete_id = []

        if status == 'INPROGRESS':
            for record in objects:
                if record['status'] == 'HIDDEN' and str(record['actionId']) == str(actionId):
                    print(delete_id)
                    delete_id.append(record['userActionId'])

        if status == 'COMPLETE' or 'HIDDEN':
            for record in objects:
                if record['status'] == 'INPROGRESS' and str(record['actionId']) == str(actionId):
                    delete_id.append(record['userActionId'])
        for id in delete_id:
            push_record(request.args, queries.deleteUserAction(id), return_as_records=True)
        return push_record(request.args, queries.pushActionStatus(user_guid, status, actionId))
    except Exception as e:
        return jsonify({'resp':"An Error Occured"}), 500


if __name__ == '__main__':
    app.run()
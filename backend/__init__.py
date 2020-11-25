from flask import Flask, request, jsonify
from flask_awscognito import AWSCognitoAuthentication 
import datetime as dt
import config
import mysql.connector
import queries

app = Flask(__name__)

app.config['AWS_DEFAULT_REGION'] = config.AWS_DEFAULT_REGION
app.config['AWS_COGNITO_DOMAIN'] = config.AWS_COGNITO_DOMAIN
app.config['AWS_COGNITO_USER_POOL_ID'] = config.AWS_COGNITO_USER_POOL_ID
app.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = config.AWS_COGNITO_USER_POOL_CLIENT_ID
app.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = config.AWS_COGNITO_USER_POOL_CLIENT_SECRET
app.config['AWS_COGNITO_REDIRECT_URL'] = config.AWS_COGNITO_REDIRECT_URL
aws_auth = AWSCognitoAuthentication(app)


class APIReceiver:
    def __enter__(self):
        self.conn = mysql.connector.connect(
            host=config.MYSQL_HOST,
            user=config.MYSQL_USER,
            password=config.MYSQL_PASSWORD,
            database=config.MYSQL_DB)
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, etype, value, traceback):
        self.conn.close()

    def query_results(self, query, query_type):
        self.cursor.execute(query)
        if query_type == 'PUSH':
            self.conn.commit()
            return True
        records = self.cursor.fetchall()
        columns = self.cursor.column_names
        objects = [dict(zip(columns, record)) for record in records]
        return objects


def get_response(query, query_type, return_as_records=False):
    with APIReceiver() as api_manager:
        objects = api_manager.query_results(query, query_type)
        if query_type == 'GET':
            if return_as_records:
                return objects
            return jsonify(objects), 200
        if query_type == 'PUSH':
            return jsonify({'resp': 'Success'}), 200


@app.route('/fetchDashboardListings', methods=['POST'])
@aws_auth.authentication_required
def fetch_dashboard_listings():
    def deactivate_actions(actions, guid):
        actions_to_deactivate = []
        for action in actions:
            if action['active']:
                if      action['expireDT'] < dt.datetime.now() or \
                        action['firstPresentedDT'] < dt.datetime.now() - dt.timedelta(days=14) or \
                        action['status']:
                    actions_to_deactivate.append(action['actionId'])
                    action['active'] = 0
        if actions_to_deactivate:
            get_response(queries.pushDeactivateActions(actions_to_deactivate, guid), "PUSH")
        return actions

    def get_more_actions(actions, user_cause, guid):
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
                response = get_response(queries.getEasyAction(exclude_list, guid), 'GET', return_as_records=True)
                if response:
                    id = response[0]['actionId']
                    new_actionIds.append(id)
                    exclude_list.append(id)
            while appropriate_cause_count < 2:
                response = get_response(queries.getUserCausePrefAction(exclude_list, guid, user_cause), 'GET', return_as_records=True)
                if response:
                    id = response[0]['actionId']
                    new_actionIds.append(id)
                    exclude_list.append(id)
                appropriate_cause_count += 1

            response = get_response(queries.getRandomAction(exclude_list, guid), 'GET', return_as_records=True)
            if response:
                id = response[0]['actionId']
                new_actionIds.append(id)
                exclude_list.append(id)
        return previous_actionIds, new_actionIds

    def flag_actions_active(previous_actionIds, new_actionIds, guid):
        if previous_actionIds:
            get_response(queries.updateUserDashActionsStatus(previous_actionIds, dt.datetime.now(), guid), "PUSH")
        for action_Id in new_actionIds:
            get_response(queries.pushUserDashActionsStatus(action_Id, dt.datetime.now(), guid), "PUSH")

    guid = aws_auth.claims['custom:userGuid']
    user_cause = aws_auth.claims['custom:causes']

    actions = get_response(queries.getDashboardActionsForAlgorithm(guid), 'GET', return_as_records=True)
    actions = deactivate_actions(actions, guid)
    previous_actionIds, new_actionIds = get_more_actions(actions, user_cause, guid)
    flag_actions_active(previous_actionIds, new_actionIds, guid)
    return get_response(queries.listActionsDashboard(previous_actionIds + new_actionIds), 'GET')


@app.route('/fetchHiddenActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_hidden_actions():
    return get_response(queries.fetchHiddenActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchCompletedActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_completed_actions():
    return get_response(queries.fetchCompletedActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchMyActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_my_actions():
    return get_response(queries.fetchMyActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushNewUserGuid', methods=['POST'])
@aws_auth.authentication_required
def push_new_user_guid():
    return get_response(queries.pushNewUserGuid(aws_auth.claims['custom:userGuid']), "PUSH")


@app.route('/pushCalcExp', methods=['POST'])
@aws_auth.authentication_required
def push_calc_exp():
    guid = aws_auth.claims['custom:userGuid']
    objects = get_response(queries.fetchUserLevel(guid), 'GET', return_as_records=True)
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
    return get_response(queries.pushCalcExp(exp, level, nextLevel, totalActions, previousLevel, guid,
                            EcoActions, EnvActions, JustActions), "PUSH")


@app.route('/fetchUserExperience', methods=['POST'])
@aws_auth.authentication_required
def fetch_user_experience():
    return get_response(queries.fetchUserExperience(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushActionStatus', methods=['POST'])
@aws_auth.authentication_required
def push_action_status():
    try:
        user_guid = aws_auth.claims['custom:userGuid']
        status = request.args.get('statusUpdate')
        actionId = request.args.get('actionId')
        objects = get_response(queries.getUserActions(user_guid), 'GET', return_as_records=True)
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
            get_response(queries.deleteUserAction(id), "PUSH")
        return get_response(queries.pushActionStatus(user_guid, status, actionId), "PUSH")
    except Exception as e:
        return jsonify({'resp':"An Error Occured"}), 500


if __name__ == '__main__':
    app.run()

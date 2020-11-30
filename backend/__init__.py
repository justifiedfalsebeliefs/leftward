from flask import Flask, request, jsonify
from flask_awscognito import AWSCognitoAuthentication 
import datetime as dt
import config
import mysql.connector
import queries
import json

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

    def get_more_actions(actions, guid):
        previous_actionIds = []
        new_actionIds = []
        exclude_list = []
        if actions:
            exclude_list = [action['actionId'] for action in actions]
            for action in actions:
                if action['active']:
                    previous_actionIds.append(action['actionId'])
        if len(new_actionIds + previous_actionIds) >= 4:
            return previous_actionIds, new_actionIds

        remaining_actions_needed = 4 - len(previous_actionIds + new_actionIds)
        actionIdObjects = get_response(queries.getActionIdsForDashboard(
            remaining_actions_needed, exclude_list, guid), 'GET', return_as_records=True)
        for record in actionIdObjects:
            id = record['actionId']
            new_actionIds.append(id)
        return previous_actionIds, new_actionIds

    guid = aws_auth.claims['custom:userGuid']
    actions = get_response(queries.getDashboardActionsForAlgorithm(guid), 'GET', return_as_records=True)
    actions = deactivate_actions(actions, guid)
    previous_actionIds, new_actionIds = get_more_actions(actions, guid)
    if previous_actionIds:
        get_response(queries.updateUserDashActionsStatus(previous_actionIds, dt.datetime.now(), guid), "PUSH")
    for action_Id in new_actionIds:
        get_response(queries.pushUserDashActionsStatus(action_Id, dt.datetime.now(), guid), "PUSH")
    actionIds = (previous_actionIds + new_actionIds)
    if not actionIds:
        return jsonify({'response': "All actions completed!"}), 200
    return get_response(queries.listActionsDashboard(actionIds), 'GET')


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
    userActionsObjects = get_response(queries.fetchCompletedUserActions(guid), 'GET', return_as_records=True)
    userObjects = get_response(queries.getUser(guid), 'GET', return_as_records=True)
    preUpdateLevel = userObjects[0]['levelNumber']
    pointsEarnedTotal = sum([x['reward'] for x in userActionsObjects])
    currentLevelObjects = get_response(queries.getLevelByPoints(pointsEarnedTotal), 'GET', return_as_records=True)
    currentLevel = currentLevelObjects[0]['level']
    LevelPointsRequiredObjects = get_response(queries.getPointsByLevel(currentLevel), 'GET', return_as_records=True)
    currentLevelPointsRequired = LevelPointsRequiredObjects[0]['currentPointsRequired']
    nextLevelPointsRequired = LevelPointsRequiredObjects[0]['nextPointsRequired']

    level_up = False
    if preUpdateLevel > currentLevel:
        level_up = True

    totalActionsCompletedCount = 0
    actionsByCause = {'Economic Justice': {'count': 0, 'points': 0},
                      'Legal Justice': {'count': 0, 'points': 0},
                      'Environmental Justice': {'count': 0, 'points': 0},
                      'Racial Justice': {'count': 0, 'points': 0},
                      'Gender and LGBTQ+ Justice': {'count': 0, 'points': 0}}
    for record in userActionsObjects:
        actionsByCause[record['cause']]['count'] += 1
        actionsByCause[record['cause']]['points'] += record['reward']
        totalActionsCompletedCount += 1

    userDetails = {'actionsByCause': json.dumps(actionsByCause), 'totalActionsCompletedCount': totalActionsCompletedCount,
                   'pointsEarnedTotal': pointsEarnedTotal,
                   'currentLevel': currentLevel, 'currentLevelPointsRequired': currentLevelPointsRequired,
                   'nextLevel': currentLevel+1, 'nextLevelPointsRequired': nextLevelPointsRequired}

    get_response(queries.pushUpdateUser(guid, **userDetails), "PUSH")
    return jsonify({'levelUp': level_up, 'userDetails': userDetails}), 200


@app.route('/fetchUserExperience', methods=['POST'])
@aws_auth.authentication_required
def fetch_user_experience():
    return get_response(queries.fetchUserExperience(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushActionStatus', methods=['POST'])
@aws_auth.authentication_required
def push_action_status():
    user_guid = aws_auth.claims['custom:userGuid']
    actionId = request.args.get('actionId')
    get_response(queries.deleteUserAction(actionId, user_guid), "PUSH")
    return get_response(queries.pushActionStatus(user_guid, request.args.get('statusUpdate'), actionId), "PUSH")


if __name__ == '__main__':
    app.run()

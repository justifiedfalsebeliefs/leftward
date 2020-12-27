from flask import Flask, request, jsonify
from flask_awscognito import AWSCognitoAuthentication 
import datetime as dt
import mysql.connector
import json
import os

app = Flask(__name__)

# AWS cognito variables
app.config['AWS_DEFAULT_REGION'] = os.getenv('AWS_DEFAULT_REGION') # 'eu-west-1'
app.config['AWS_COGNITO_DOMAIN'] = os.getenv('AWS_COGNITO_DOMAIN') # 'domain.com'
app.config['AWS_COGNITO_USER_POOL_ID'] = os.getenv('AWS_COGNITO_USER_POOL_ID') # 'eu-west-1_XXX'
app.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = os.getenv('AWS_COGNITO_USER_POOL_CLIENT_ID') # 'YYY'
app.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = os.getenv('AWS_COGNITO_USER_POOL_CLIENT_SECRET') # 'ZZZZ'
app.config['AWS_COGNITO_REDIRECT_URL'] = os.getenv('AWS_COGNITO_REDIRECT_URL')
aws_auth = AWSCognitoAuthentication(app)

# database environment variables
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')


class APIReceiver:
    def __enter__(self):
        self.conn = mysql.connector.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB)
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


def get_user_by_guid(guid, return_as_records=False):
    return get_response("SELECT * FROM user WHERE userGuid = '{}';".format(guid), 'GET', return_as_records=return_as_records)


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
            get_response("""UPDATE userDashboardActions SET active = 0 WHERE actionId in ({}) and userGuid = '{}'
                    """.format(str(actions_to_deactivate)[1:-1], guid), "PUSH")
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
        if not exclude_list:
            exclude_list = '--11'
        query = """SELECT actionId from action WHERE
                    actionId not in ({}) AND
                    actionId not in (SELECT actionId from userAction where userGuid = '{}')
                    ORDER BY RAND()
                    LIMIT {}""".format(str(exclude_list)[1:-1], guid, remaining_actions_needed)

        actionIdObjects = get_response(query, 'GET', return_as_records=True)
        for record in actionIdObjects:
            id = record['actionId']
            new_actionIds.append(id)
        return previous_actionIds, new_actionIds

    guid = aws_auth.claims['custom:userGuid']
    actions = get_response("""SELECT 
            uda.actionId, 
            uda.active,
            uda.lastPresentedDT,
            uda.firstPresentedDT,
            a.expireDT,
            a.reward,
            ua.status
            from userDashboardActions uda
        INNER JOIN action a on a.actionId = uda.actionId
        LEFT JOIN (SELECT actionId, status from userAction WHERE userGuid = '{}') ua on ua.actionId = a.actionId
        WHERE uda.userGuid = '{}';""".format(guid, guid), 'GET', return_as_records=True)
    actions = deactivate_actions(actions, guid)
    previous_actionIds, new_actionIds = get_more_actions(actions, guid)
    if previous_actionIds:
        get_response("""
            UPDATE userDashboardActions SET active = 1, lastPresentedDT = '{}' WHERE actionId in ({}) AND userGuid = '{}'
            """.format(dt.datetime.now(), str(previous_actionIds)[1:-1], guid), "PUSH")
    for action_Id in new_actionIds:
        get_response(""" INSERT INTO userDashboardActions (actionId, active, lastPresentedDT, firstPresentedDT, userGuid)
     VALUES ({}, 1, '{}', '{}', '{}')""".format(action_Id, dt.datetime.now(), dt.datetime.now(), guid), "PUSH")
    actionIds = (previous_actionIds + new_actionIds)
    if not actionIds:
        return jsonify({'response': "All actions completed!"}), 200
    return get_response("""
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.cause as 'actionCause',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'dashboard' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE a.actionId IN ({})
        LIMIT 4;""".format(str(actionIds)[1:-1]), 'GET')


@app.route('/fetchHiddenActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_hidden_actions():
    return get_response("""
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'hidden' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE ( NOW() between a.liveDT and a.expireDT )
        AND a.actionId IN (
            SELECT DISTINCT actionId from userAction 
            WHERE userGuid = '{}' 
            AND status = 'HIDDEN')
        """.format(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchCompletedActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_completed_actions():
    return get_response("""
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'complete' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE ( NOW() between a.liveDT and a.expireDT )
        AND a.actionId IN (
            SELECT DISTINCT actionId from userAction 
            WHERE userGuid = '{}' 
            AND status = 'COMPLETE')
        """.format(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchMyActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_my_actions():
    return get_response("""
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'myActions' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE ( NOW() between a.liveDT and a.expireDT )
        AND a.actionId IN (
            SELECT DISTINCT actionId from userAction 
            WHERE userGuid = '{}' 
            AND status = 'INPROGRESS')
        """.format(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushNewUserGuid', methods=['POST'])
@aws_auth.authentication_required
def push_new_user_guid():
    return get_response("INSERT INTO user ( userGuid ) VALUES ('{}')".format(aws_auth.claims['custom:userGuid']), "PUSH")


@app.route('/fetchUserStatistics', methods=['POST'])
@aws_auth.authentication_required
def fetch_user_experience():
    return get_user_by_guid(aws_auth.claims['custom:userGuid'])


@app.route('/pushActionStatus', methods=['POST'])
@aws_auth.authentication_required
def push_action_status():
    guid = aws_auth.claims['custom:userGuid']

    user = get_user_by_guid(guid, return_as_records=True)
    preUpdateLevel = user[0]['levelNumber']

    actionId = request.args.get('actionId')
    get_response("DELETE FROM userAction where actionId = {} AND userGuid = '{}'".format(actionId, guid), "PUSH")
    get_response("""
    INSERT INTO userAction ( userGuid, status, actionId, reward, cause) 
    VALUES ('{}', '{}', {}, (SELECT reward FROM action WHERE actionId = {}), (SELECT cause FROM action WHERE actionId = {}))
        """.format(guid, request.args.get('statusUpdate'), str(actionId),str(actionId), str(actionId)), "PUSH")


    userActionsObjects = get_response("""
    SELECT userActionId, actionId, reward, cause FROM userAction WHERE userGuid = '{}' and status = 'COMPLETE';
    """.format(guid), 'GET', return_as_records=True)
    pointsEarnedTotal = sum([x['reward'] for x in userActionsObjects])
    currentLevelObjects = get_response("""SELECT MAX(levelNumber) as level from level WHERE pointsRequired <= {}""".format(pointsEarnedTotal), 'GET', return_as_records=True)
    currentLevel = currentLevelObjects[0]['level']
    LevelPointsRequiredObjects = get_response("""SELECT
        (SELECT pointsRequired from level WHERE levelNumber = {}) as currentPointsRequired,
        (SELECT pointsRequired from level WHERE levelNumber = {}) as nextPointsRequired
        """.format(currentLevel, currentLevel + 1), 'GET', return_as_records=True)
    currentLevelPointsRequired = LevelPointsRequiredObjects[0]['currentPointsRequired']
    nextLevelPointsRequired = LevelPointsRequiredObjects[0]['nextPointsRequired']

    level_up = False
    if preUpdateLevel < currentLevel:
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

    def pushUpdateUser(guid, actionsByCause, totalActionsCompletedCount, pointsEarnedTotal, currentLevel,
                       currentLevelPointsRequired, nextLevelPointsRequired, nextLevel):
        return """
        UPDATE user SET 
            levelNumber = {} ,
            pointsEarnedTotal = {} ,
            nextLevelPointsRequired = {},
            currentLevelPointsRequired = {},
            totalActionsCompletedCount = {},
            actionsByCause = '{}'
        WHERE userGuid = '{}';
        """.format(currentLevel, pointsEarnedTotal, nextLevelPointsRequired, currentLevelPointsRequired,
                   totalActionsCompletedCount, actionsByCause, guid)
    get_response(pushUpdateUser(guid, **userDetails), "PUSH")
    return jsonify({'levelUp': level_up, 'userDetails': userDetails}), 200


if __name__ == '__main__':
    app.run()

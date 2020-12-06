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

def listActionsDashboard(ids):
    return """
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
        LIMIT 4;""".format(str(ids)[1:-1])

def getDashboardActionsForAlgorithm(guid):
    return """SELECT 
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
        WHERE uda.userGuid = '{}';""".format(guid, guid)

def pushDeactivateActions(actionIds, guid):
    if not actionIds:
        exclude_list = '--11'
    return """UPDATE userDashboardActions SET active = 0 WHERE actionId in ({}) and userGuid = '{}'
        """.format(str(actionIds)[1:-1], guid)

def getActionIdsForDashboard(remaining_actions_needed, exclude_list, guid):
    if not exclude_list:
        exclude_list = '--11'
    return """SELECT actionId from action WHERE
                actionId not in ({}) AND
                actionId not in (SELECT actionId from userAction where userGuid = '{}')
                ORDER BY RAND()
                LIMIT {}""".format(str(exclude_list)[1:-1], guid, remaining_actions_needed)

def updateUserDashActionsStatus(action_ids, dt, guid):
    if not action_ids:
        action_ids = '--11'
    return """
    UPDATE userDashboardActions SET active = 1, lastPresentedDT = '{}' WHERE actionId in ({}) AND userGuid = '{}'
    """.format(dt, str(action_ids)[1:-1], guid)


def pushUserDashActionsStatus(action_id, dt, guid):
    return """ INSERT INTO userDashboardActions (actionId, active, lastPresentedDT, firstPresentedDT, userGuid)
     VALUES ({}, 1, '{}', '{}', '{}')""".format(action_id, dt, dt, guid)

def pushNewUserGuid(guid):
    return "INSERT INTO user ( userGuid ) VALUES ('{}')".format(guid)

def pushActionStatus(guid, status, actionId ):
    return """
    INSERT INTO userAction ( userGuid, status, actionId, reward, cause) 
    VALUES ('{}', '{}', {}, (SELECT reward FROM action WHERE actionId = {}), (SELECT cause FROM action WHERE actionId = {}))
        """.format(guid, status, str(actionId),str(actionId), str(actionId))

def fetchHiddenActions(guid):
    return """
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
        """.format(guid)

def fetchCompletedActions(guid):
    return """
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
        """.format(guid)

def fetchMyActions(guid):
    return """
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
        """.format(guid)

def deleteUserAction(userActionId, guid):
    return "DELETE FROM userAction where actionId = {} AND userGuid = '{}'".format(userActionId, guid)

def fetchUserExperience(guid):
    return """
    SELECT
        levelNumber,
        nextLevelPointsRequired,
        currentLevelPointsRequired,
        pointsEarnedTotal,
        actionsByCause,
        totalActionsCompletedCount
    from user
    WHERE userGuid = '{}'
""".format(guid)

def pushUpdateUser(guid, actionsByCause, totalActionsCompletedCount, pointsEarnedTotal, currentLevel,
                   currentLevelPointsRequired, nextLevelPointsRequired, nextLevel):
    return"""
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

def fetchCompletedUserActions(guid):
    return"""
    SELECT userActionId, actionId, reward, cause FROM userAction WHERE userGuid = '{}' and status = 'COMPLETE';
    """.format(guid)

def getUser(guid):
    return"SELECT * FROM user WHERE userGuid = '{}';".format(guid)

def getLevelByPoints(points):
    return"""SELECT MAX(levelNumber) as level from level WHERE pointsRequired <= {}""".format(points)

def getPointsByLevel(level):
    return"""
    SELECT
    (SELECT pointsRequired from level WHERE levelNumber = {}) as currentPointsRequired,
    (SELECT pointsRequired from level WHERE levelNumber = {}) as nextPointsRequired
    """.format(level, level+1)


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
            get_response(pushDeactivateActions(actions_to_deactivate, guid), "PUSH")
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
        actionIdObjects = get_response(getActionIdsForDashboard(
            remaining_actions_needed, exclude_list, guid), 'GET', return_as_records=True)
        for record in actionIdObjects:
            id = record['actionId']
            new_actionIds.append(id)
        return previous_actionIds, new_actionIds

    guid = aws_auth.claims['custom:userGuid']
    actions = get_response(getDashboardActionsForAlgorithm(guid), 'GET', return_as_records=True)
    actions = deactivate_actions(actions, guid)
    previous_actionIds, new_actionIds = get_more_actions(actions, guid)
    if previous_actionIds:
        get_response(updateUserDashActionsStatus(previous_actionIds, dt.datetime.now(), guid), "PUSH")
    for action_Id in new_actionIds:
        get_response(pushUserDashActionsStatus(action_Id, dt.datetime.now(), guid), "PUSH")
    actionIds = (previous_actionIds + new_actionIds)
    if not actionIds:
        return jsonify({'response': "All actions completed!"}), 200
    return get_response(listActionsDashboard(actionIds), 'GET')


@app.route('/fetchHiddenActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_hidden_actions():
    return get_response(fetchHiddenActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchCompletedActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_completed_actions():
    return get_response(fetchCompletedActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/fetchMyActions', methods=['POST'])
@aws_auth.authentication_required
def fetch_my_actions():
    return get_response(fetchMyActions(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushNewUserGuid', methods=['POST'])
@aws_auth.authentication_required
def push_new_user_guid():
    return get_response(pushNewUserGuid(aws_auth.claims['custom:userGuid']), "PUSH")


@app.route('/pushCalcExp', methods=['POST'])
@aws_auth.authentication_required
def push_calc_exp():
    guid = aws_auth.claims['custom:userGuid']
    userActionsObjects = get_response(fetchCompletedUserActions(guid), 'GET', return_as_records=True)
    userObjects = get_response(getUser(guid), 'GET', return_as_records=True)
    preUpdateLevel = userObjects[0]['levelNumber']
    pointsEarnedTotal = sum([x['reward'] for x in userActionsObjects])
    currentLevelObjects = get_response(getLevelByPoints(pointsEarnedTotal), 'GET', return_as_records=True)
    currentLevel = currentLevelObjects[0]['level']
    LevelPointsRequiredObjects = get_response(getPointsByLevel(currentLevel), 'GET', return_as_records=True)
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

    get_response(pushUpdateUser(guid, **userDetails), "PUSH")
    return jsonify({'levelUp': level_up, 'userDetails': userDetails}), 200


@app.route('/fetchUserExperience', methods=['POST'])
@aws_auth.authentication_required
def fetch_user_experience():
    return get_response(fetchUserExperience(aws_auth.claims['custom:userGuid']), 'GET')


@app.route('/pushActionStatus', methods=['POST'])
@aws_auth.authentication_required
def push_action_status():
    guid = aws_auth.claims['custom:userGuid']
    actionId = request.args.get('actionId')
    get_response(deleteUserAction(actionId, guid), "PUSH")
    get_response(pushActionStatus(guid, request.args.get('statusUpdate'), actionId), "PUSH")
    userActionsObjects = get_response(fetchCompletedUserActions(guid), 'GET', return_as_records=True)
    userObjects = get_response(getUser(guid), 'GET', return_as_records=True)
    preUpdateLevel = userObjects[0]['levelNumber']
    pointsEarnedTotal = sum([x['reward'] for x in userActionsObjects])
    currentLevelObjects = get_response(getLevelByPoints(pointsEarnedTotal), 'GET', return_as_records=True)
    currentLevel = currentLevelObjects[0]['level']
    LevelPointsRequiredObjects = get_response(getPointsByLevel(currentLevel), 'GET', return_as_records=True)
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

    get_response(pushUpdateUser(guid, **userDetails), "PUSH")
    return jsonify({'levelUp': level_up, 'userDetails': userDetails}), 200


if __name__ == '__main__':
    app.run()

from flask import Flask, request, jsonify
from flask_awscognito import AWSCognitoAuthentication
from datetime import datetime, timedelta
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

    def query_results(self, query):
        self.cursor.execute(query)
        try:
            records = self.cursor.fetchall()
            columns = self.cursor.column_names
            objects = [dict(zip(columns, record)) for record in records]
            return objects
        except Exception:
            pass
        self.conn.commit()
        return


@app.route('/createNewUser', methods=['POST'])
@aws_auth.authentication_required
def create_new_user():
    """
    Hit upon user registration.
    """
    guid = aws_auth.claims['custom:userGuid']
    create_user(guid)
    update_user_record(guid)
    return jsonify({'response': 'success'}), 200


@app.route('/populateState', methods=['POST'])
@aws_auth.authentication_required
def populate_state():
    """
    Hit when user loads app. Returns data to populate app state, including:
    - progression (level, points, action count summaries). Stored.
    - touched_actions: User's previously interacted with actions (saved actions, completed actions). Stored.
    - curated_actions: Actions in the user's "For You" actions. Always derived.
    """
    guid = aws_auth.claims['custom:userGuid']
    progression = {}
    saved = []
    completed = []
    curated = []
    if request.args.get('progression'):
        progression = get_user_data(guid)
    if request.args.get('curated'):
        curated = derive_curated_actions(guid)
    if request.args.get('saved'):
        saved = derive_saved_actions(guid)
    if request.args.get('completed'):
        completed = derive_completed_actions(guid)
    return jsonify({'progression': progression, 'saved': saved, 'completed': completed, 'curated': curated}), 200


@app.route('/populateActionListings', methods=['POST'])
@aws_auth.authentication_required
def populate_action_listings():
    """
    TODO: Pagination
    Hit when user drills to a view of action listings. Returns all information associated with an action in the DB.
    Filters actions according to pre-defined keys. Returns all actions. Keys:
    - By cause
    - By action type
    """
    guid = aws_auth.claims['custom:userGuid']
    query_key = request.args.get('queryKey')
    actions = derive_new_actions_by_key(query_key, guid)
    return jsonify({'actions': actions}), 200

@app.route('/updateUserAction', methods=['POST'])
@aws_auth.authentication_required
def update_user_action():
    """
    Hit when user interacts with an action.
    """
    guid = aws_auth.claims['custom:userGuid']
    action_id = request.args.get('actionId')
    action_state = request.args.get('actionState')
    action_reward = request.args.get('reward')
    action_cause = request.args.get('cause')
    delete_userAction(guid, action_id)
    create_userAction(guid, action_id, action_state, action_reward, action_cause)
    if action_state == 'COMPLETE':
        update_user_record(guid=guid)
    return jsonify({'response': 'success'}), 200

def get_user_data(guid):
    sql = "SELECT * FROM user WHERE userGuid = '{}';".format(guid)
    return query_from_sql(sql)[0]

def query_from_sql(sql):
    with APIReceiver() as api_manager:
        return api_manager.query_results(sql)

def derive_curated_actions(guid):
    """
    Gets a custom list of actions according to user's preferences
    """

    sql = """SELECT
            uda.actionId,
            uda.active,
            uda.lastPresentedDT,
            uda.firstPresentedDT,
            a.expireDT,
            a.cause,
            a.reward,
            ua.status
            from userDashboardActions uda
        INNER JOIN action a on a.actionId = uda.actionId
        LEFT JOIN (SELECT actionId, status from userAction WHERE userGuid = '{}') ua on ua.actionId = a.actionId
        WHERE uda.userGuid = '{}';""".format(guid, guid)
    actions = query_from_sql(sql)
    actions_to_deactivate = []
    for action in actions:
        if action['active']:
            if action['expireDT'] < datetime.now() or \
                    action['firstPresentedDT'] < datetime.now() - timedelta(days=14) or \
                    action['status']:
                actions_to_deactivate.append(action['actionId'])
                action['active'] = 0
    if actions_to_deactivate:
        sql = """UPDATE userDashboardActions SET active = 0 WHERE actionId in ({}) and userGuid = '{}'
                """.format(str(actions_to_deactivate)[1:-1], guid)
        query_from_sql(sql)

    previous_actionIds = []
    new_actionIds = []
    exclude_list = []
    if actions:
        exclude_list = [action['actionId'] for action in actions]
        for action in actions:
            if action['active']:
                previous_actionIds.append(action['actionId'])
    if len(new_actionIds + previous_actionIds) < 4:
        remaining_actions_needed = 4 - len(previous_actionIds + new_actionIds)
        if not exclude_list:
            exclude_list = '--11'
        sql = """SELECT actionId from action WHERE
                    actionId not in ({}) AND
                    actionId not in (SELECT actionId from userAction where userGuid = '{}')
                    ORDER BY RAND()
                    LIMIT {}""".format(str(exclude_list)[1:-1], guid, remaining_actions_needed)
        actionIdObjects = query_from_sql(sql)

        for record in actionIdObjects:
            id = record['actionId']
            new_actionIds.append(id)

    if previous_actionIds:
        sql = """
            UPDATE userDashboardActions SET active = 1, lastPresentedDT = '{}' WHERE actionId in ({}) AND userGuid = '{}'
            """.format(datetime.now(), str(previous_actionIds)[1:-1], guid)
        query_from_sql(sql)
    for action_Id in new_actionIds:
        sql = """ INSERT INTO userDashboardActions (actionId, active, lastPresentedDT, firstPresentedDT, userGuid)
     VALUES ({}, 1, '{}', '{}', '{}')""".format(action_Id, datetime.now(), datetime.now(), guid)
        query_from_sql(sql)

    actionIds = (previous_actionIds + new_actionIds)
    sql = """
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
        LIMIT 4;""".format(str(actionIds)[1:-1])
    return query_from_sql(sql)

def derive_saved_actions(guid):
    """
    Returns list of user's saved actions.
    """
    sql = """ SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.cause as 'actionCause',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'saved' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE a.actionId IN (SELECT DISTINCT actionId from userAction WHERE userGuid = '{}' AND status = 'SAVED')
        LIMIT 20;""".format(guid)
    return query_from_sql(sql)

def derive_completed_actions(guid):
    """
    Returns list of user's completed actions.
    """
    sql = """ SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
        a.cause as 'actionCause',
        a.url as 'actionUrl',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        o.url as 'organizationUrl',
        'saved' as 'sourceList',
        reward
    FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
        WHERE a.actionId IN (SELECT DISTINCT actionId from userAction WHERE userGuid = '{}' AND status = 'COMPLETE')
        LIMIT 20;""".format(guid)
    return query_from_sql(sql)

def derive_new_actions_by_key(query_key, guid):
    """
     Gets actions the user has not completed according to the query_key. Key is cause or action type
    """
    # determine where clause
    # append where clause to get sql
    where_clause = ''
    if query_key == 'Quick Actions':
        where_clause = """AND a.actionType IN ('Petition', 'Write Letters')"""
    if query_key == 'Legal Justice':
        where_clause = """AND a.cause = 'Legal Justice'"""
    if query_key == 'Environmental Justice':
        where_clause = """AND a.cause = 'Environmental Justice'"""
    if query_key == 'LGBTQ+ Justice':
        where_clause = """AND a.cause = 'LGBTQ+ Justice'"""
    if query_key == 'Racial Justice':
        where_clause = """AND a.cause = 'Racial Justice'"""
    if query_key == 'Economic Justice':
        where_clause = """AND a.cause = ''Economic Justice'"""

    sql = """ SELECT
            a.actionId, a.title as 'actionTitle',
            a.description as 'actionDescription',
            a.actionType as 'actionType',
            a.cause as 'actionCause',
            a.url as 'actionUrl',
            o.title as 'organizationTitle',
            o.description as 'organizationDescription',
            o.url as 'organizationUrl',
            'listing' as 'sourceList',
            reward
        FROM action a INNER JOIN organization o on o.organizationId = a.organizationId
            WHERE a.actionId NOT IN (SELECT DISTINCT actionId from userAction WHERE userguid = '{}')
            {}
            LIMIT 20;""".format(guid, where_clause)
    return query_from_sql(sql)

def delete_userAction(guid, action_id):
    """
    Deletes existing userAction records for provided action_id
    """
    sql = "DELETE FROM userAction where actionId = {} AND userGuid = '{}'".format(action_id, guid)
    query_from_sql(sql)
    return

def create_userAction(guid, action_id, action_state, action_reward, action_cause):
    """
    Creates userAction record for provided action_id and state
    """
    sql = """
        INSERT INTO userAction ( userGuid, status, actionId, reward, cause)
        VALUES ('{}', '{}', {}, {}, '{}')
            """.format(guid, action_state, str(action_id), str(action_reward), action_cause)
    query_from_sql(sql)
    return

def create_user(guid):
    sql = "INSERT INTO user ( userGuid ) VALUES ('{}')".format(guid)
    query_from_sql(sql)
    return

def update_user_record(guid):
    """
    Updates user record fields. Returns user record.
    """
    sql = """
        SELECT userActionId, actionId, reward, cause FROM userAction WHERE userGuid = '{}' and status = 'COMPLETE';
        """.format(guid)
    userAction_records = query_from_sql(sql)
    points_earned_total = sum([x['reward'] for x in userAction_records])

    sql = """SELECT MAX(levelNumber) as level from level WHERE pointsRequired <= {}""".format(points_earned_total)
    current_level = query_from_sql(sql)[0]['level']
    next_level = current_level + 1

    sql = """SELECT
            (SELECT pointsRequired from level WHERE levelNumber = {}) as currentPointsRequired,
            (SELECT pointsRequired from level WHERE levelNumber = {}) as nextPointsRequired
            """.format(current_level, next_level)
    current_level_points_required = query_from_sql(sql)[0]['currentPointsRequired']
    next_level_points_required = query_from_sql(sql)[0]['nextPointsRequired']

    total_actions_completed = 0
    actions_by_cause = {'Economic Justice': {'count': 0, 'points': 0},
                      'Legal Justice': {'count': 0, 'points': 0},
                      'Environmental Justice': {'count': 0, 'points': 0},
                      'Racial Justice': {'count': 0, 'points': 0},
                      'Gender and LGBTQ+ Justice': {'count': 0, 'points': 0}}
    for record in userAction_records:
        actions_by_cause[record['cause']]['count'] += 1
        actions_by_cause[record['cause']]['points'] += record['reward']
        total_actions_completed += 1

    sql = """
            UPDATE user SET
                levelNumber = {} ,
                pointsEarnedTotal = {} ,
                nextLevelPointsRequired = {},
                currentLevelPointsRequired = {},
                totalActionsCompletedCount = {},
                actionsByCause = '{}'
            WHERE userGuid = '{}';
            """.format(current_level, points_earned_total, next_level_points_required, current_level_points_required,
                       total_actions_completed, json.dumps(actions_by_cause), guid)
    query_from_sql(sql)

    return {current_level, points_earned_total, next_level_points_required, current_level_points_required,
                       total_actions_completed, json.dumps(actions_by_cause), guid}

if __name__ == '__main__':
    app.run()

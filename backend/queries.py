def listActionsDashboard(ids):
    return """
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        a.actionType as 'actionType',
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
        levelUpPoints,
        previousLevelUpPoints,
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

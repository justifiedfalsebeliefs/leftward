def listActionsDashboard(ids):
    return """
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        at.title as 'actionType',
        ca.title as 'causeTitle',
        c.title as 'campaignTitle',
        a.url as 'url',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        'dashboard' as 'sourceList',
        reward
    FROM action a INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN actionType at on at.actionTypeId = a.actionTypeId
        INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
        INNER JOIN cause ca on ca.causeId = cc.causeId
        INNER JOIN organization o on o.organizationId = c.organizationId
        WHERE a.actionId IN ({})
        LIMIT 5;""".format(str(ids)[1:-1])


def getDashboardActionsForAlgorithm(guid):
    return """SELECT 
            uda.actionId, 
            uda.active,
            uda.lastPresentedDT,
            uda.firstPresentedDT,
            a.expireDT,
            a.reward,
            ua.status,
            ca.title as 'causeTitle'
            from userDashboardActions uda
        INNER JOIN action a on a.actionId = uda.actionId
        LEFT JOIN (SELECT actionId, status from userAction WHERE userGuid = '{}') ua on ua.actionId = a.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
        INNER JOIN cause ca on ca.causeId = cc.causeId
        WHERE uda.userGuid = '{}';""".format(guid, guid)

def pushDeactivateActions(actionIds, guid):
    if not actionIds:
        exclude_list = '--11'
    return """UPDATE userDashboardActions SET active = 0 WHERE actionId in ({}) and userGuid = '{}'
        """.format(str(actionIds)[1:-1], guid)

def getEasyAction(exclude_list, guid):
    if not exclude_list:
        exclude_list = '--11'
    return """SELECT actionId from action WHERE
                    actionId not in ({}) AND
                    actionId not in (SELECT actionId from userAction where userGuid = '{}') AND
                    reward < 50
                    ORDER BY RAND()
                    LIMIT 1
                    """.format(str(exclude_list)[1:-1], guid)

def getUserCausePrefAction(exclude_list, guid, user_cause):
    if not exclude_list:
        exclude_list = '--11'
    return """SELECT actionId from action a
                    INNER JOIN campaign c on c.campaignId = a.campaignId
                    INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
                    INNER JOIN cause ca on ca.causeId = cc.causeId
                WHERE
                actionId not in ({}) AND
                actionId not in (SELECT actionId from userAction where userGuid = '{}') AND
                c.title = '{}'
                ORDER BY RAND()
                LIMIT 1
                """.format(str(exclude_list)[1:-1], guid, user_cause)

def getRandomAction(exclude_list, guid):
    if not exclude_list:
        exclude_list = '--11'
    return """SELECT actionId from action WHERE
            actionId not in ({}) AND
            actionId not in (SELECT actionId from userAction where userGuid = '{}')
            ORDER BY RAND()
            LIMIT 1""".format(str(exclude_list)[1:-1], guid)

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
    return """
    INSERT INTO user ( guid ) VALUES ('{}')
        """.format(guid)

def pushActionStatus(guid, status, actionId ):
    return """
    INSERT INTO userAction ( userGuid, status, actionId ) VALUES ('{}', '{}', {})
        """.format(guid, status, str(actionId) )

def fetchHiddenActions(guid):
    return """
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        at.title as 'actionType',
        ca.title as 'causeTitle',
        a.url as 'url',
        c.title as 'campaignTitle',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        'hidden' as 'sourceList',
        reward
    FROM action a INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN actionType at on at.actionTypeId = a.actionTypeId
        INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
        INNER JOIN cause ca on ca.causeId = cc.causeId
        INNER JOIN organization o on o.organizationId = c.organizationId
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
        at.title as 'actionType',
        ca.title as 'causeTitle',
        c.title as 'campaignTitle',
        a.url as 'url',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        'complete' as 'sourceList',
        reward
    FROM action a INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN actionType at on at.actionTypeId = a.actionTypeId
        INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
        INNER JOIN cause ca on ca.causeId = cc.causeId
        INNER JOIN organization o on o.organizationId = c.organizationId
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
        at.title as 'actionType',
        ca.title as 'causeTitle',
        c.title as 'campaignTitle',
        a.url as 'url',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
        'myActions' as 'sourceList',
        reward
    FROM action a INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN actionType at on at.actionTypeId = a.actionTypeId
        INNER JOIN campaignCause cc on cc.campaignId = c.campaignId
        INNER JOIN cause ca on ca.causeId = cc.causeId
        INNER JOIN organization o on o.organizationId = c.organizationId
        WHERE ( NOW() between a.liveDT and a.expireDT )
        AND a.actionId IN (
            SELECT DISTINCT actionId from userAction 
            WHERE userGuid = '{}' 
            AND status = 'INPROGRESS')
        """.format(guid)

def getUserActions(guid):
    return """
    SELECT * FROM userAction where userGuid = '{}'
    """.format(guid)

def deleteUserAction(userActionId):
    return """
    DELETE FROM userAction where userActionId = {}
    """.format(userActionId)

def fetchUserExperience(guid):
    return """
    SELECT
        level,
        nextLevel,
        previousLevel,
        exp,
        EnvActions,
        EcoActions,
        JustActions,
        HealthActions,
        totalActions
    from user
    WHERE guid = '{}'
""".format(guid)

def pushCalcExp(exp, level, nextLevel, totalActions, previousLevel, guid, EcoActions, EnvActions, JustActions):
    return"""
    UPDATE user SET 
        exp = {} ,
        LEVEL = {},
        nextLevel = {},
        totalActions = {},
        previousLevel = {},
        EcoActions = {},
        EnvActions = {},
        JustActions = {}
    WHERE guid = '{}';
    """.format(exp, level, nextLevel, totalActions, previousLevel, EcoActions, EnvActions, JustActions, guid)

def fetchUserLevel(guid):
    return"""
    SELECT
    (SELECT SUM(a.reward)
            FROM userAction ua
            INNER JOIN action a on a.actionId = ua.actionId
            WHERE ua.userGuid = '{}'
            AND ua.status = 'COMPLETE') as exp,
    (SELECT MAX(levelNumber) from level l
                WHERE expRequired <= (
                    SELECT SUM(a.reward)
                    FROM userAction ua
                    INNER JOIN action a on a.actionId = ua.actionId
                    WHERE ua.userGuid = '{}'
                    AND ua.status = 'COMPLETE')) as level,
    (SELECT expRequired from level WHERE levelNumber = (
                    SELECT MAX(levelNumber) from level l
                WHERE expRequired <= (
                    SELECT SUM(a.reward)
                    FROM userAction ua
                    INNER JOIN action a on a.actionId = ua.actionId
                    WHERE ua.userGuid = '{}'
                    AND ua.status = 'COMPLETE'))+1) as nextLevel,
        (SELECT expRequired from level WHERE levelNumber = (
                    SELECT MAX(levelNumber) from level l
                WHERE expRequired <= (
                    SELECT SUM(a.reward)
                    FROM userAction ua
                    INNER JOIN action a on a.actionId = ua.actionId
                    WHERE ua.userGuid = '{}'
                    AND ua.status = 'COMPLETE'))) as previousLevel,
    (SELECT COUNT(a.actionId)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE') as totalActions,
    
        (SELECT COUNT(a.actionId)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Environment Protection'
        ) as EnvActions,
                (SELECT SUM(a.reward)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Environment Protection'
        ) as EnvExp,
        
        (SELECT COUNT(a.actionId)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Economic Justice'
        ) as EcoActions,
                        (SELECT SUM(a.reward)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Economic Justice'
        ) as EcoExp,
        
        (SELECT COUNT(a.actionId)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Criminal Justice Reform'
        ) as JustActions,
                        (SELECT SUM(a.reward)
        FROM userAction ua
        INNER JOIN action a on a.actionId = ua.actionId
        INNER JOIN campaign c on c.campaignId = a.campaignId
        INNER JOIN campaignCause cc on c.campaignId = cc.campaignId
        INNER JOIN cause c2 on c2.causeId = cc.causeId
        WHERE ua.userGuid = '{}'
        AND ua.status = 'COMPLETE'
        AND c2.title = 'Criminal Justice Reform'
        ) as JustExp
        ;
    """.format(guid, guid, guid, guid, guid, guid, guid, guid, guid, guid, guid)

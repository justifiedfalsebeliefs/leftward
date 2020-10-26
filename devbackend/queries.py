def listActionsDashboard(guid):
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
        WHERE ( NOW() between a.liveDT and a.expireDT )
        AND a.actionId NOT IN (
            SELECT DISTINCT actionId from userAction 
            WHERE userGuid = '{}')
        """.format(guid)

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

def pushCalcExp(exp, level, nextLevel, totalActions, previousLevel, guid):
    return"""
    UPDATE user SET 
        exp = {} ,
        LEVEL = {},
        nextLevel = {},
        totalActions = {},
        previousLevel = {}
    WHERE guid = '{}';
    """.format(exp, level, nextLevel, totalActions, previousLevel, guid)

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
        AND ua.status = 'COMPLETE') as totalActions;
    """.format(guid, guid, guid, guid, guid)

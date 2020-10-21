def listActionsDashboard(guid):
    return """
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        at.title as 'actionType',
        ca.title as 'causeTitle',
        c.title as 'campaignTitle',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
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
        c.title as 'campaignTitle',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
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

def fetchMyActions(guid):
    return """
    SELECT
        a.actionId, a.title as 'actionTitle',
        a.description as 'actionDescription',
        at.title as 'actionType',
        ca.title as 'causeTitle',
        c.title as 'campaignTitle',
        c.description as 'campaignDescription',
        o.contact as 'organizationContact',
        o.title as 'organizationTitle',
        o.description as 'organizationDescription',
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
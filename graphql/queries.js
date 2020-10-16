/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAction = /* GraphQL */ `
  query GetAction($actionId: Int!) {
    getAction(actionId: $actionId) {
      actionId
      createDT
      updateDT
      ownerId
      actionTypeId
      campaignId
      title
      description
      reward
      imageURL
      liveDT
      expireDT
    }
  }
`;
export const listActions = /* GraphQL */ `
  query ListActions {
    listActions {
      actionId
      actionTypeId
      campaignId
      title
      description
      reward
      imageURL
      liveDT
      expireDT
    }
  }
`;
export const listActionsDashboard = /* GraphQL */ `
  query listActionsDashboard {
    listActionsDashboard {
      actionId
      actionTitle
      actionDescription
      actionType
      causeTitle
      campaignTitle
      campaignDescription
      reward
    }
  }
`;

export const getActionType = /* GraphQL */ `
  query GetActionType($actionTypeId: Int!) {
    getActionType(actionTypeId: $actionTypeId) {
      actionTypeId
      createDT
      updateDT
      ownerId
      title
      description
      icon
    }
  }
`;
export const listActionTypes = /* GraphQL */ `
  query ListActionTypes {
    listActionTypes {
      actionTypeId
      createDT
      updateDT
      ownerId
      title
      description
      icon
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($campaignId: Int!) {
    getCampaign(campaignId: $campaignId) {
      campaignId
      createDT
      updateDT
      ownerId
      organizationId
      title
      description
      liveDT
      expireDT
      imageURL
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns {
    listCampaigns {
      campaignId
      createDT
      updateDT
      ownerId
      organizationId
      title
      description
      liveDT
      expireDT
      imageURL
    }
  }
`;
export const getCampaignCause = /* GraphQL */ `
  query GetCampaignCause($campaignCauseId: Int!) {
    getCampaignCause(campaignCauseId: $campaignCauseId) {
      campaignCauseId
      createDT
      updateDT
      ownerId
      causeId
      rank
      campaignId
    }
  }
`;
export const listCampaignCauses = /* GraphQL */ `
  query ListCampaignCauses {
    listCampaignCauses {
      campaignCauseId
      createDT
      updateDT
      ownerId
      causeId
      rank
      campaignId
    }
  }
`;
export const getCause = /* GraphQL */ `
  query GetCause($causeId: Int!) {
    getCause(causeId: $causeId) {
      causeId
      createDT
      updateDT
      ownerId
      title
      description
      icon
    }
  }
`;
export const listCauses = /* GraphQL */ `
  query ListCauses {
    listCauses {
      causeId
      title
      description
      icon
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($organizationId: Int!) {
    getOrganization(organizationId: $organizationId) {
      organizationId
      createDT
      updateDT
      ownerId
      contact
      title
      description
      imageURL
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations {
    listOrganizations {
      organizationId
      createDT
      updateDT
      ownerId
      contact
      title
      description
      imageURL
    }
  }
`;
export const getOrganizationCause = /* GraphQL */ `
  query GetOrganizationCause($organizationCauseId: Int!) {
    getOrganizationCause(organizationCauseId: $organizationCauseId) {
      organizationCauseId
      createDT
      updateDT
      ownerId
      organizationId
      causeId
      rank
    }
  }
`;
export const listOrganizationCauses = /* GraphQL */ `
  query ListOrganizationCauses {
    listOrganizationCauses {
      organizationCauseId
      createDT
      updateDT
      ownerId
      organizationId
      causeId
      rank
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      userId
      createDT
      updateDT
      ownerId
      guid
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers {
      userId
      createDT
      updateDT
      ownerId
      guid
    }
  }
`;
export const getUserAction = /* GraphQL */ `
  query GetUserAction($userActionId: Int!) {
    getUserAction(userActionId: $userActionId) {
      userActionId
      createDT
      updateDT
      ownerId
      userId
      status
      actionId
    }
  }
`;
export const listUserActions = /* GraphQL */ `
  query ListUserActions {
    listUserActions {
      userActionId
      createDT
      updateDT
      ownerId
      userId
      status
      actionId
    }
  }
`;
export const getUserActionType = /* GraphQL */ `
  query GetUserActionType($userActionTypeId: Int!) {
    getUserActionType(userActionTypeId: $userActionTypeId) {
      userActionTypeId
      createDT
      updateDT
      ownerId
      userId
      actionTypeId
      isActive
    }
  }
`;
export const listUserActionTypes = /* GraphQL */ `
  query ListUserActionTypes {
    listUserActionTypes {
      userActionTypeId
      createDT
      updateDT
      ownerId
      userId
      actionTypeId
      isActive
    }
  }
`;
export const getUserCause = /* GraphQL */ `
  query GetUserCause($userCauseId: Int!) {
    getUserCause(userCauseId: $userCauseId) {
      userCauseId
      createDT
      updateDT
      ownerId
      userId
      causeId
      rank
    }
  }
`;
export const listUserCauses = /* GraphQL */ `
  query ListUserCauses {
    listUserCauses {
      userCauseId
      createDT
      updateDT
      ownerId
      userId
      causeId
      rank
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

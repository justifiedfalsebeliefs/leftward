/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteAction = /* GraphQL */ `
  mutation DeleteAction($actionId: Int!) {
    deleteAction(actionId: $actionId) {
      ownerId
      actionTypeId
      campaignId
      title
      description
      reward
      imageURL
      liveDT
      expireDT
      actionId
      actionTitle
      actionDescription
      actionType
      causeTitle
      campaignTitle
      campaignDescription
      organizationContact
      organizationTitle
      organizationDescription
      test
      userGuid
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction($createActionInput: CreateActionInput!) {
    createAction(createActionInput: $createActionInput) {
      ownerId
      actionTypeId
      campaignId
      title
      description
      reward
      imageURL
      liveDT
      expireDT
      actionId
      actionTitle
      actionDescription
      actionType
      causeTitle
      campaignTitle
      campaignDescription
      organizationContact
      organizationTitle
      organizationDescription
      test
      userGuid
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction($updateActionInput: UpdateActionInput!) {
    updateAction(updateActionInput: $updateActionInput) {
      ownerId
      actionTypeId
      campaignId
      title
      description
      reward
      imageURL
      liveDT
      expireDT
      actionId
      actionTitle
      actionDescription
      actionType
      causeTitle
      campaignTitle
      campaignDescription
      organizationContact
      organizationTitle
      organizationDescription
      test
      userGuid
    }
  }
`;
export const deleteActionType = /* GraphQL */ `
  mutation DeleteActionType($actionTypeId: Int!) {
    deleteActionType(actionTypeId: $actionTypeId) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const createActionType = /* GraphQL */ `
  mutation CreateActionType($createActionTypeInput: CreateActionTypeInput!) {
    createActionType(createActionTypeInput: $createActionTypeInput) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const updateActionType = /* GraphQL */ `
  mutation UpdateActionType($updateActionTypeInput: UpdateActionTypeInput!) {
    updateActionType(updateActionTypeInput: $updateActionTypeInput) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign($campaignId: Int!) {
    deleteCampaign(campaignId: $campaignId) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign($createCampaignInput: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $createCampaignInput) {
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
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign($updateCampaignInput: UpdateCampaignInput!) {
    updateCampaign(updateCampaignInput: $updateCampaignInput) {
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
export const deleteCampaignCause = /* GraphQL */ `
  mutation DeleteCampaignCause($campaignCauseId: Int!) {
    deleteCampaignCause(campaignCauseId: $campaignCauseId) {
      ownerId
      causeId
      rank
      campaignId
    }
  }
`;
export const createCampaignCause = /* GraphQL */ `
  mutation CreateCampaignCause(
    $createCampaignCauseInput: CreateCampaignCauseInput!
  ) {
    createCampaignCause(createCampaignCauseInput: $createCampaignCauseInput) {
      ownerId
      causeId
      rank
      campaignId
    }
  }
`;
export const updateCampaignCause = /* GraphQL */ `
  mutation UpdateCampaignCause(
    $updateCampaignCauseInput: UpdateCampaignCauseInput!
  ) {
    updateCampaignCause(updateCampaignCauseInput: $updateCampaignCauseInput) {
      ownerId
      causeId
      rank
      campaignId
    }
  }
`;
export const deleteCause = /* GraphQL */ `
  mutation DeleteCause($causeId: Int!) {
    deleteCause(causeId: $causeId) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const createCause = /* GraphQL */ `
  mutation CreateCause($createCauseInput: CreateCauseInput!) {
    createCause(createCauseInput: $createCauseInput) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const updateCause = /* GraphQL */ `
  mutation UpdateCause($updateCauseInput: UpdateCauseInput!) {
    updateCause(updateCauseInput: $updateCauseInput) {
      ownerId
      title
      description
      icon
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization($organizationId: Int!) {
    deleteOrganization(organizationId: $organizationId) {
      ownerId
      contact
      title
      description
      imageURL
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $createOrganizationInput: CreateOrganizationInput!
  ) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      ownerId
      contact
      title
      description
      imageURL
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $updateOrganizationInput: UpdateOrganizationInput!
  ) {
    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
      ownerId
      contact
      title
      description
      imageURL
    }
  }
`;
export const deleteOrganizationCause = /* GraphQL */ `
  mutation DeleteOrganizationCause($organizationCauseId: Int!) {
    deleteOrganizationCause(organizationCauseId: $organizationCauseId) {
      ownerId
      organizationId
      causeId
      rank
    }
  }
`;
export const createOrganizationCause = /* GraphQL */ `
  mutation CreateOrganizationCause(
    $createOrganizationCauseInput: CreateOrganizationCauseInput!
  ) {
    createOrganizationCause(
      createOrganizationCauseInput: $createOrganizationCauseInput
    ) {
      ownerId
      organizationId
      causeId
      rank
    }
  }
`;
export const updateOrganizationCause = /* GraphQL */ `
  mutation UpdateOrganizationCause(
    $updateOrganizationCauseInput: UpdateOrganizationCauseInput!
  ) {
    updateOrganizationCause(
      updateOrganizationCauseInput: $updateOrganizationCauseInput
    ) {
      ownerId
      organizationId
      causeId
      rank
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($userId: Int!) {
    deleteUser(userId: $userId) {
      ownerId
      guid
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ownerId
      guid
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ownerId
      guid
    }
  }
`;
export const deleteUserAction = /* GraphQL */ `
  mutation DeleteUserAction($userActionId: Int!) {
    deleteUserAction(userActionId: $userActionId) {
      ownerId
      userGuid
      status
      actionId
    }
  }
`;
export const createUserAction = /* GraphQL */ `
  mutation CreateUserAction($createUserActionInput: CreateUserActionInput!) {
    createUserAction(createUserActionInput: $createUserActionInput) {
      ownerId
      userGuid
      status
      actionId
    }
  }
`;
export const updateUserAction = /* GraphQL */ `
  mutation UpdateUserAction($updateUserActionInput: UpdateUserActionInput!) {
    updateUserAction(updateUserActionInput: $updateUserActionInput) {
      ownerId
      userGuid
      status
      actionId
    }
  }
`;
export const deleteUserActionType = /* GraphQL */ `
  mutation DeleteUserActionType($userActionTypeId: Int!) {
    deleteUserActionType(userActionTypeId: $userActionTypeId) {
      ownerId
      userId
      actionTypeId
      isActive
    }
  }
`;
export const createUserActionType = /* GraphQL */ `
  mutation CreateUserActionType(
    $createUserActionTypeInput: CreateUserActionTypeInput!
  ) {
    createUserActionType(
      createUserActionTypeInput: $createUserActionTypeInput
    ) {
      ownerId
      userId
      actionTypeId
      isActive
    }
  }
`;
export const updateUserActionType = /* GraphQL */ `
  mutation UpdateUserActionType(
    $updateUserActionTypeInput: UpdateUserActionTypeInput!
  ) {
    updateUserActionType(
      updateUserActionTypeInput: $updateUserActionTypeInput
    ) {
      ownerId
      userId
      actionTypeId
      isActive
    }
  }
`;
export const deleteUserCause = /* GraphQL */ `
  mutation DeleteUserCause($userCauseId: Int!) {
    deleteUserCause(userCauseId: $userCauseId) {
      ownerId
      userId
      causeId
      rank
    }
  }
`;
export const createUserCause = /* GraphQL */ `
  mutation CreateUserCause($createUserCauseInput: CreateUserCauseInput!) {
    createUserCause(createUserCauseInput: $createUserCauseInput) {
      ownerId
      userId
      causeId
      rank
    }
  }
`;
export const updateUserCause = /* GraphQL */ `
  mutation UpdateUserCause($updateUserCauseInput: UpdateUserCauseInput!) {
    updateUserCause(updateUserCauseInput: $updateUserCauseInput) {
      ownerId
      userId
      causeId
      rank
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

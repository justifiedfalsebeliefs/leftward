/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction {
    onCreateAction {
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
export const onCreateActionType = /* GraphQL */ `
  subscription OnCreateActionType {
    onCreateActionType {
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
export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign {
    onCreateCampaign {
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
export const onCreateCampaignCause = /* GraphQL */ `
  subscription OnCreateCampaignCause {
    onCreateCampaignCause {
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
export const onCreateCause = /* GraphQL */ `
  subscription OnCreateCause {
    onCreateCause {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
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
export const onCreateOrganizationCause = /* GraphQL */ `
  subscription OnCreateOrganizationCause {
    onCreateOrganizationCause {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      userId
      createDT
      updateDT
      ownerId
      guid
    }
  }
`;
export const onCreateUserAction = /* GraphQL */ `
  subscription OnCreateUserAction {
    onCreateUserAction {
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
export const onCreateUserActionType = /* GraphQL */ `
  subscription OnCreateUserActionType {
    onCreateUserActionType {
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
export const onCreateUserCause = /* GraphQL */ `
  subscription OnCreateUserCause {
    onCreateUserCause {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

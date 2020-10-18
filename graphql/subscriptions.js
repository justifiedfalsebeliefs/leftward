/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction {
    onCreateAction {
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
export const onCreateActionType = /* GraphQL */ `
  subscription OnCreateActionType {
    onCreateActionType {
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
      ownerId
      guid
    }
  }
`;
export const onCreateUserAction = /* GraphQL */ `
  subscription OnCreateUserAction {
    onCreateUserAction {
      ownerId
      userGuid
      status
      actionId
    }
  }
`;
export const onCreateUserActionType = /* GraphQL */ `
  subscription OnCreateUserActionType {
    onCreateUserActionType {
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

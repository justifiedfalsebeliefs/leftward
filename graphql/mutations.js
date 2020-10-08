/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
      id
      title
      description
      organization {
        id
        title
        description
        image
        contact
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      liveDate
      expireDate
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCampaign = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
      id
      title
      description
      organization {
        id
        title
        description
        image
        contact
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      liveDate
      expireDate
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
      id
      title
      description
      organization {
        id
        title
        description
        image
        contact
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      liveDate
      expireDate
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction(
    $input: CreateActionInput!
    $condition: ModelActionConditionInput
  ) {
    createAction(input: $input, condition: $condition) {
      id
      title
      description
      campaign {
        id
        title
        description
        organization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        liveDate
        expireDate
        actions {
          id
          title
          description
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      contribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      image
      reward
      liveDate
      expireDate
      createdAt
      updatedAt
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction(
    $input: UpdateActionInput!
    $condition: ModelActionConditionInput
  ) {
    updateAction(input: $input, condition: $condition) {
      id
      title
      description
      campaign {
        id
        title
        description
        organization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        liveDate
        expireDate
        actions {
          id
          title
          description
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      contribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      image
      reward
      liveDate
      expireDate
      createdAt
      updatedAt
    }
  }
`;
export const deleteAction = /* GraphQL */ `
  mutation DeleteAction(
    $input: DeleteActionInput!
    $condition: ModelActionConditionInput
  ) {
    deleteAction(input: $input, condition: $condition) {
      id
      title
      description
      campaign {
        id
        title
        description
        organization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        liveDate
        expireDate
        actions {
          id
          title
          description
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      contribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      image
      reward
      liveDate
      expireDate
      createdAt
      updatedAt
    }
  }
`;
export const createCause = /* GraphQL */ `
  mutation CreateCause(
    $input: CreateCauseInput!
    $condition: ModelCauseConditionInput
  ) {
    createCause(input: $input, condition: $condition) {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const updateCause = /* GraphQL */ `
  mutation UpdateCause(
    $input: UpdateCauseInput!
    $condition: ModelCauseConditionInput
  ) {
    updateCause(input: $input, condition: $condition) {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const deleteCause = /* GraphQL */ `
  mutation DeleteCause(
    $input: DeleteCauseInput!
    $condition: ModelCauseConditionInput
  ) {
    deleteCause(input: $input, condition: $condition) {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const createContribution = /* GraphQL */ `
  mutation CreateContribution(
    $input: CreateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    createContribution(input: $input, condition: $condition) {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const updateContribution = /* GraphQL */ `
  mutation UpdateContribution(
    $input: UpdateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    updateContribution(input: $input, condition: $condition) {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const deleteContribution = /* GraphQL */ `
  mutation DeleteContribution(
    $input: DeleteContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    deleteContribution(input: $input, condition: $condition) {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      title
      description
      image
      contact
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      title
      description
      image
      contact
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      title
      description
      image
      contact
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      causeRank
      actPreference
      experience
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      achievement {
        id
        title
        description
        icon
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        condition
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      causeRank
      actPreference
      experience
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      achievement {
        id
        title
        description
        icon
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        condition
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      causeRank
      actPreference
      experience
      actions {
        id
        title
        description
        campaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        contribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        image
        reward
        liveDate
        expireDate
        createdAt
        updatedAt
      }
      achievement {
        id
        title
        description
        icon
        cause {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        condition
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAchievement = /* GraphQL */ `
  mutation CreateAchievement(
    $input: CreateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    createAchievement(input: $input, condition: $condition) {
      id
      title
      description
      icon
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      condition
      createdAt
      updatedAt
    }
  }
`;
export const updateAchievement = /* GraphQL */ `
  mutation UpdateAchievement(
    $input: UpdateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    updateAchievement(input: $input, condition: $condition) {
      id
      title
      description
      icon
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      condition
      createdAt
      updatedAt
    }
  }
`;
export const deleteAchievement = /* GraphQL */ `
  mutation DeleteAchievement(
    $input: DeleteAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    deleteAchievement(input: $input, condition: $condition) {
      id
      title
      description
      icon
      cause {
        id
        description
        title
        icon
        createdAt
        updatedAt
      }
      condition
      createdAt
      updatedAt
    }
  }
`;

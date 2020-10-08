/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign($owner: String) {
    onCreateCampaign(owner: $owner) {
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
export const onUpdateCampaign = /* GraphQL */ `
  subscription OnUpdateCampaign($owner: String) {
    onUpdateCampaign(owner: $owner) {
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
export const onDeleteCampaign = /* GraphQL */ `
  subscription OnDeleteCampaign($owner: String) {
    onDeleteCampaign(owner: $owner) {
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction($owner: String) {
    onCreateAction(owner: $owner) {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction($owner: String) {
    onUpdateAction(owner: $owner) {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction($owner: String) {
    onDeleteAction(owner: $owner) {
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
export const onCreateCause = /* GraphQL */ `
  subscription OnCreateCause {
    onCreateCause {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCause = /* GraphQL */ `
  subscription OnUpdateCause {
    onUpdateCause {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCause = /* GraphQL */ `
  subscription OnDeleteCause {
    onDeleteCause {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContribution = /* GraphQL */ `
  subscription OnCreateContribution {
    onCreateContribution {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContribution = /* GraphQL */ `
  subscription OnUpdateContribution {
    onUpdateContribution {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContribution = /* GraphQL */ `
  subscription OnDeleteContribution {
    onDeleteContribution {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization($owner: String) {
    onCreateOrganization(owner: $owner) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization($owner: String) {
    onUpdateOrganization(owner: $owner) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization($owner: String) {
    onDeleteOrganization(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateAchievement = /* GraphQL */ `
  subscription OnCreateAchievement {
    onCreateAchievement {
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
export const onUpdateAchievement = /* GraphQL */ `
  subscription OnUpdateAchievement {
    onUpdateAchievement {
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
export const onDeleteAchievement = /* GraphQL */ `
  subscription OnDeleteAchievement {
    onDeleteAchievement {
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

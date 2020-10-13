/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCampaign = /* GraphQL */ `
  subscription OnCreateCampaign($owner: String) {
    onCreateCampaign(owner: $owner) {
      id
      title
      description
      liveDate
      expireDate
      sponsoringOrganization {
        id
        title
        description
        image
        contact
        supportsCauses {
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
      supportsCauses {
        items {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        nextToken
      }
      hasActions {
        items {
          id
          title
          description
          tmpCampaign
          tmpContribution
          tmpOrganization
          tmpcause
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        nextToken
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
      liveDate
      expireDate
      sponsoringOrganization {
        id
        title
        description
        image
        contact
        supportsCauses {
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
      supportsCauses {
        items {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        nextToken
      }
      hasActions {
        items {
          id
          title
          description
          tmpCampaign
          tmpContribution
          tmpOrganization
          tmpcause
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        nextToken
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
      liveDate
      expireDate
      sponsoringOrganization {
        id
        title
        description
        image
        contact
        supportsCauses {
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
      supportsCauses {
        items {
          id
          description
          title
          icon
          createdAt
          updatedAt
        }
        nextToken
      }
      hasActions {
        items {
          id
          title
          description
          tmpCampaign
          tmpContribution
          tmpOrganization
          tmpcause
          image
          reward
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        nextToken
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
      partofCampaign {
        id
        title
        description
        liveDate
        expireDate
        sponsoringOrganization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        supportsCauses {
          nextToken
        }
        hasActions {
          nextToken
        }
        createdAt
        updatedAt
      }
      tmpCampaign
      needsContribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      tmpContribution
      tmpOrganization
      tmpcause
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
      partofCampaign {
        id
        title
        description
        liveDate
        expireDate
        sponsoringOrganization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        supportsCauses {
          nextToken
        }
        hasActions {
          nextToken
        }
        createdAt
        updatedAt
      }
      tmpCampaign
      needsContribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      tmpContribution
      tmpOrganization
      tmpcause
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
      partofCampaign {
        id
        title
        description
        liveDate
        expireDate
        sponsoringOrganization {
          id
          title
          description
          image
          contact
          createdAt
          updatedAt
        }
        supportsCauses {
          nextToken
        }
        hasActions {
          nextToken
        }
        createdAt
        updatedAt
      }
      tmpCampaign
      needsContribution {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      tmpContribution
      tmpOrganization
      tmpcause
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
      supportsCauses {
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
      supportsCauses {
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
      supportsCauses {
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
      participatedActions {
        id
        title
        description
        partofCampaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        tmpCampaign
        needsContribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        tmpContribution
        tmpOrganization
        tmpcause
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      username
      causeRank
      actPreference
      experience
      participatedActions {
        id
        title
        description
        partofCampaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        tmpCampaign
        needsContribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        tmpContribution
        tmpOrganization
        tmpcause
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      username
      causeRank
      actPreference
      experience
      participatedActions {
        id
        title
        description
        partofCampaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
        }
        tmpCampaign
        needsContribution {
          id
          title
          description
          icon
          createdAt
          updatedAt
        }
        tmpContribution
        tmpOrganization
        tmpcause
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

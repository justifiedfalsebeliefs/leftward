/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
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
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
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
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCause = /* GraphQL */ `
  query GetCause($id: ID!) {
    getCause(id: $id) {
      id
      description
      title
      icon
      createdAt
      updatedAt
    }
  }
`;
export const listCauses = /* GraphQL */ `
  query ListCauses(
    $filter: ModelCauseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCauses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getContribution = /* GraphQL */ `
  query GetContribution($id: ID!) {
    getContribution(id: $id) {
      id
      title
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
export const listContributions = /* GraphQL */ `
  query ListContributions(
    $filter: ModelContributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContributions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        icon
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        causeRank
        actPreference
        experience
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
        achievement {
          id
          title
          description
          icon
          condition
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAchievement = /* GraphQL */ `
  query GetAchievement($id: ID!) {
    getAchievement(id: $id) {
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
export const listAchievements = /* GraphQL */ `
  query ListAchievements(
    $filter: ModelAchievementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

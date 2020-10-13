/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
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
        partofCampaign {
          id
          title
          description
          liveDate
          expireDate
          createdAt
          updatedAt
          sponsoringOrganization {
            contact
            description
            id
            image
            title
            updatedAt
            supportsCauses {
              title
            }
          }
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
        participatedActions {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

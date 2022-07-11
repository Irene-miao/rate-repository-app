import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS, USER_FIELDS} from './fragments';



export const GET_REPOSITORIES = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, after: $after, searchKeyword: $searchKeyword) {
    totalCount
    edges {
      node {
       ...repositoryFields
       ratingAverage
        reviewCount
      }
      cursor
    }
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
}

  ${REPOSITORY_FIELDS}
`;

export const GET_USERS = gql`
query Query {
  users {
    edges {
      node {
        username
      }
    }
  }
}
`;

export const GET_ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    ...userFields
    reviewCount
    reviews @include(if: $includeReviews) {
      edges {
        node {
         ...reviewFields
         repository {
          ownerName
          name
        }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}


${USER_FIELDS}
${REVIEW_FIELDS}
`;


export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
   ...repositoryFields
  }
}
${REPOSITORY_FIELDS}
`;


export const GET_REVIEWS = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    ...repositoryFields
    reviewCount
    ratingAverage
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
 ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORIES_ORDERBY = gql`
query ExampleQuery($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      cursor
      node {
        ...repositoryFields
        reviewCount
        ratingAverage
        reviews {
          edges {
            node {
              text
              user {
                username
              }
              createdAt
              rating
            }
          }
        }
      }
    }
  }
}

${REPOSITORY_FIELDS}

`;

export const SEARCH = gql`
query Query($searchKeyword: String) {
  repositories(searchKeyword: $searchKeyword) {
    edges {
      node {
        ...repositoryFields
        reviewCount
        ratingAverage
        reviews {
          edges {
            node {
              text
              user {
                username
              }
              createdAt
              rating
            }
          }
        }
      }
    }
  }
}

${REPOSITORY_FIELDS}
`;


export const GET_REPOSITORIES_PAGINATED = gql`
query Repositories($first: Int, $after: String) {
  repositories(first: $first, after: $after) {
    totalCount
    edges {
      node {
        ...repositoryFields
        reviewCount
        ratingAverage
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}

${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY_REVIEW = gql`
query Query($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    ...repositoryFields
    reviewCount
    ratingAverage
    reviews(first: $first, after: $after) {
      totalCount
      edges {
        node {
          ...reviewFields
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
${REPOSITORY_FIELDS}
${REVIEW_FIELDS}

`;


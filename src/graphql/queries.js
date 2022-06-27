import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, USER_FIELDS} from './fragments';



export const GET_REPOSITORIES = gql`
query Query {
    repositories {
      edges {
        node {
         ...repositoryFields
          reviewCount
          ratingAverage
        }
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
query {
  me {
   ...userFields
  }
}

${USER_FIELDS}
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

`
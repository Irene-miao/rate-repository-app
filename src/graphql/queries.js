import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          description
          language
          forksCount
          fullName
          stargazersCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
  
`

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
`

export const GET_ME = gql`
{
  me {
    id
    username
  }
}
`
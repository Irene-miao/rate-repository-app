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
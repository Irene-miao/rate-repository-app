import { gql } from '@apollo/client';
import {USER_FIELDS} from './fragments';


export const AUTHENTICATE = gql`
mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user{
        ...userFields
      }
    }
  }

  ${USER_FIELDS}
`;

export const CREATE_USER = gql`
mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt
    }
  }
`;


export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    repositoryId
    rating
    createdAt
    text
  }
}
`
;

export const DELETE_REVIEW  = gql`
mutation Mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;

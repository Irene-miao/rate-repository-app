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
    }
  }
`;
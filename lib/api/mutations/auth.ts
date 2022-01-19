import { gql } from "@apollo/client"

import { userAuthFragment } from "./fragments"

export const registerMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      ${userAuthFragment}
    }
  }
`
export const loginMutation = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      ${userAuthFragment}
    }
  }
`

export const refreshMutation = gql`
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`

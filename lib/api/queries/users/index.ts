import { gql } from "@apollo/client"

export const registerUser = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`

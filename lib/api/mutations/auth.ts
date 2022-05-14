import { gql } from "urql"

export const registerMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        ...userAuth
      }
    }
  }
`
export const loginMutation = gql`
  mutation LoginUser(
    $cookiesInput: LoginWithCookiesInput!
    $jwtInput: LoginInput!
  ) {
    loginWithCookies(input: $cookiesInput) {
      status
    }
    login(input: $jwtInput) {
      user {
        ...userAuth
      }
    }
  }
`

export const logoutMutation = gql`
  mutation LogoutUser($input: LogoutInput!) {
    logout(input: $input) {
      status
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

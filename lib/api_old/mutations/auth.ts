import { gql } from "urql"

const registerMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        ...UserAuthBase
      }
    }
  }
`

const loginMutation = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserAuthBase
      }
    }
  }
`

// const loginMutation = gql`
//   mutation LoginUser(
//     $cookiesInput: LoginWithCookiesInput!
//     $jwtInput: LoginInput!
//   ) {
//     loginWithCookies(input: $cookiesInput) {
//       status
//     }
//     login(input: $jwtInput) {
//       user {
//         ...UserAuthBase
//       }
//     }
//   }
// `

const logoutMutation = gql`
  mutation LogoutUser($input: LogoutInput!) {
    logout(input: $input) {
      status
    }
  }
`

const refreshMutation = gql`
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`

const resetUserPasswordMutation = gql`
  mutation ResetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      clientMutationId
      user {
        ...UserAuthBase
      }
    }
  }
`

const sendPasswordResetEmailMutation = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      clientMutationId
    }
  }
`

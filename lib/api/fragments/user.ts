import { gql } from "urql"

export const userAuthBaseFragment = gql`
  fragment userAuth on User {
    id
    databaseId
    jwtAuthToken
    jwtRefreshToken
    firstName
    lastName
    username
    email
  }
`

import { gql } from "urql"

const userAuthBaseFragment = gql`
  fragment UserAuthBase on User {
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

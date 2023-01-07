import { gql } from "urql"

const getUserQuery = gql`
  query GetUser {
    customer {
      id
      databaseId
      firstName
      lastName
      username
      email
    }
  }
`

import { gql } from "urql"

const getUser = gql`
  query GetUser($id: ID!) {
    user(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      firstName
      lastName
      username
      email
    }
  }
`

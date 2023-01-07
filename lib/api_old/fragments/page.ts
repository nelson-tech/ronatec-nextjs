import { gql } from "urql"

const pageCommonFragment = gql`
  fragment PageCommonBase on Page {
    id
    databaseId
    title
    slug
  }
`

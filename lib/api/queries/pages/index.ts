import { gql } from "urql"
import { generalPageQuery } from "../fragments"

export const getGeneralPageData = gql`
  query GetGeneralPageData {
    ${generalPageQuery}
  }
`

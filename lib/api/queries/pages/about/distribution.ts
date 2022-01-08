import { generalPageQuery, suppliersFragment } from "@api/queries/fragments"
import { gql } from "@apollo/client"

export const getDistributionData = gql`
  query DistributionQuery {
    ${suppliersFragment}
    ${generalPageQuery}
  }
`

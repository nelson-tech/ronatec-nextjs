import { gql } from "@apollo/client/core"

import { pageCommonFragment } from "@api/queries/fragments"

export const getRonatankData = gql`
  query RonatankQuery {
    page(id: "ronatank", idType: URI) {
      ${pageCommonFragment}
      content
    }
    productCategories(where: {parent: 23}) {
      nodes {
        name
        slug
        products {
          nodes {
            name
            slug
            productCategories {
              nodes {
                name
                ancestors {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

// export { getContactData } from "./contact"
// export { getDistributionData } from "./distribution"
// export { getWarehousesData } from "./warehouses"

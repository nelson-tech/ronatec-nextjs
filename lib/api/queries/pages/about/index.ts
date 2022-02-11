import { gql } from "@apollo/client/core"

import { pageCommonFragment, cardsFragment } from "@api/queries/fragments"

export const getAboutData = gql`
  query AboutQuery {
    page(id: "about", idType: URI) {
      ${pageCommonFragment}
      page_about {
        acf {
          ${cardsFragment}
        }
      }
    }
  }
`

export { getContactData } from "./contact"
export { getDistributionData } from "./distribution"
export { getWarehousesData } from "./warehouses"

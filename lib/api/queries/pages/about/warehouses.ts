import { gql } from "@apollo/client/core"

import { pageCommonFragment, mapFragment } from "@api/queries/fragments"

export const getWarehousesData = gql`
  query WarehousesQuery {
    page(id: "about/warehouses", idType: URI) {
      ${pageCommonFragment}
      page_about_warehouses {
        acf {
          ${mapFragment}
        }
      }
    }
  }
`

import gql from "graphql-tag"
import {
  generalPageQuery,
  pageCommonFragment,
  mapFragment,
} from "@api/queries/fragments"

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
  ${generalPageQuery}
  }
`

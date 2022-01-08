import gql from "graphql-tag"
import {
  cardsFragment,
  generalPageQuery,
  mapFragment,
  pageCommonFragment,
  salesRepsFragment,
} from "@api/queries/fragments"

export const getContactData = gql`
  query ContactQuery {
    page(id: "about/contact", idType: URI) {
      ${pageCommonFragment}
      page_about_contact {
        acf {
          ${cardsFragment}
          ${salesRepsFragment}
          ${mapFragment}
        }
      }
    }
    ${generalPageQuery}
  }
`

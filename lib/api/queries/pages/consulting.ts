import { gql } from "@apollo/client/core"

import {
  pageCommonFragment,
  slidesFragment,
  calloutFragment,
  cardsFragment,
} from "@api/queries/fragments"

export const getConsultingData = gql`
  query ConsultingQuery {
    page(id: "consulting", idType: URI) {
      ${pageCommonFragment}
      page_consulting {
        acf {
          ${slidesFragment}
          content
          ${calloutFragment}
          cards {
            ${cardsFragment}
          }
          certificates {
            ${cardsFragment}
          }
        }
      }
    }
  }
`

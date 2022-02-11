import { gql } from "@apollo/client/core"

import {
  pageCommonFragment,
  featuredSupplierFragment,
  cardsFragment,
  slidesFragment,
  videoLinkFragment,
  featuredProductsFragment,
} from "@api/queries/fragments"

export const getHomeData = gql`
  query HomeQuery {
    page(id: "home", idType: URI) {
      ${pageCommonFragment}
      page_home {
        acf {
          hero {
            ${cardsFragment}
          }
          ${slidesFragment}
          ${cardsFragment}
          ${videoLinkFragment}
          ${featuredProductsFragment}
          ${featuredSupplierFragment}
        }
      }
    }
  }
`

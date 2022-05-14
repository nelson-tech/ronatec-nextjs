import { imageFragment } from "@api/fragments/common"
import { gql } from "urql"

const getCarouselItemQuery = (query: string, product = false) => gql`
query GetCarouselItems${query.split("(")[0]} {
  ${query} {
    nodes {
      id
      name
      slug
      ${imageFragment}
      ${product ? `productCategories { nodes { slug } }` : ""}
    }
  }
}
`
export default getCarouselItemQuery

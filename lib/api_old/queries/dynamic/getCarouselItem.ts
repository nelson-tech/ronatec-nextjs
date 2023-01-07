import { gql } from "urql"

const getCarouselItemQuery = (query: string, product = false) => gql`
query GetCarouselItems${query.split("(")[0]} {
  ${query} {
    nodes {
      id
      name
      slug
      image {
        id
        databaseId
        altText
        sourceUrl
        mimeType
        mediaDetails {
          height
          width
        }
        fileSize
      }
      ${
        product
          ? `productCategories { nodes { slug } }`
          : "ancestors { nodes { id } }"
      }
    }
  }
}
`
export default getCarouselItemQuery

import { gql } from "urql"

const imageBaseFragmentGQL = gql`
  fragment ImageBase on MediaItem {
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
`
const cardsFragment = gql`
  fragment CardsFragment on Page_PageAboutContact_Acf {
    cards {
      title
      content
      icon {
        name
        type
      }
      image {
        ...ImageBase
      }
      link {
        url
        label
      }
    }
  }
`

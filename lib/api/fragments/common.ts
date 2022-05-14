import { gql } from "urql"

export const imageBaseFragment = `
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
`

export const imageBaseFragmentGQL = gql`
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

export const imageFragment = `
image {
  ${imageBaseFragment}
}
`

export const slidesFragment = `
slides {
  ${imageFragment}
}`

export const calloutFragment = `
callout {
  content
  style
}`

export const cardsFragment = gql`
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

export const videoLinkFragment = `
videoLink {
  title
  provider
  videoId
  videoUrl
}`

export const pageCommonFragment = `
id
databaseId
title
slug
`

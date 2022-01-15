export const iconFragment = `
icon {
  name
  type
}
`

export const linkFragment = `
link {
  url
  label
}
`

export const imageFragment = `
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

export const cardsFragment = `
cards {
  title
  content
  ${iconFragment}
  ${imageFragment}
  ${linkFragment}
}
`

export const videoLinkFragment = `
videoLink {
  title
  provider
  videoId
  videoUrl
}`

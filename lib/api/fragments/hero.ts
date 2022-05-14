import { imageFragment } from "./common"

export const heroFragment = `
hero {
  title
  text
  link {
    url
    label
  }
  ${imageFragment}
  overlay {
    color
    opacity
  }
}
`

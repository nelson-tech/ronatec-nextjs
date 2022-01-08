import { ImageType } from "@api/queries/types"
import { NormalizedImage } from "./types"

const error = (field: string): void => {
  console.log(`Images ${field} not supplied`)
}

export const IMAGE_PLACEHOLDER = {
  url: `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons/duotone/image.svg`,
  altText: "Missing Image",
  mimeType: "image/svg+xml",
  width: 600,
  height: 600,
  size: 400,
}

export const normalizeImage = (imageObj: ImageType): NormalizedImage => {
  const image = imageObj.image
  if (!image) {
    return IMAGE_PLACEHOLDER
  }

  let url = image.sourceUrl
  if (!url) {
    url = IMAGE_PLACEHOLDER.url
    error("url")
  }

  let altText = image.altText
  if (!altText) {
    altText = image.sourceUrl!.split(/.*[\/|\\]/)[1]

    if (!altText) {
      altText = IMAGE_PLACEHOLDER.altText
      error("altText")
    }
  }

  let width = image.mediaDetails?.width
  if (!width) {
    width = IMAGE_PLACEHOLDER.width
    error("width")
  }

  let height = image.mediaDetails?.height
  if (!height) {
    height = IMAGE_PLACEHOLDER.height
    error("height")
  }

  let size = image.fileSize
  if (!size) {
    size = IMAGE_PLACEHOLDER.size
    error("size")
  }

  let mimeType = image.mimeType
  if (!mimeType) {
    mimeType = IMAGE_PLACEHOLDER.mimeType
    error("mimeType")
  }

  return { url, altText, mimeType, size, width, height }
}

export const normalizeImages = (
  images: ImageType[] | null,
): NormalizedImage[] => {
  if (!images || images.length < 1) {
    error("array")
    return [IMAGE_PLACEHOLDER]
  }

  const normalizedImages = images.map<NormalizedImage>(imageObj => {
    const normalizedImage = normalizeImage(imageObj)

    return normalizedImage
  })

  return normalizedImages
}

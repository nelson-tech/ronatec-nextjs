import { HomeFeaturedSupplierType } from "@api/queries/types/pages"
import { Maybe } from "@api/gql/types"
import { NormalizedSupplier } from "./types"

const error = (field: string): void => {
  console.log(`Supplier ${field} not supplied`)
}

export const normalizeSupplier = (
  supplier: Maybe<HomeFeaturedSupplierType> | undefined,
): NormalizedSupplier => {
  let name = supplier?.title
  if (!name) {
    name = "Missing: Name"
    error("name")
  }

  let slug = supplier?.slug
  if (!slug) {
    slug = "404"
    error("slug")
  }

  let url = supplier?.supplier?.url
  if (!url) {
    url = "#"
    error("url")
  }

  let description = supplier?.supplier?.text
  if (!description) {
    description = "Missing: Description"
    error("description")
  }

  let logoURL = supplier?.supplier?.image?.sourceUrl
  if (!logoURL) {
    logoURL = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons/duotone/image.svg`
    error("logoURL")
  }

  let logoSize = supplier?.supplier?.image?.fileSize
  if (!logoSize) {
    logoSize = 0
    error("logoSize")
  }

  let logoHeight = supplier?.supplier?.image?.mediaDetails?.height
  if (!logoHeight) {
    logoHeight = 600
    error("logoHeight")
  }

  let logoWidth = supplier?.supplier?.image?.mediaDetails?.width
  if (!logoWidth) {
    logoWidth = 600
    error("logoWidth")
  }

  if (name) {
  }

  return {
    name,
    slug,
    url,
    description,
    logo: {
      url: logoURL,
      size: logoSize,
      height: logoHeight,
      width: logoWidth,
    },
  }
}

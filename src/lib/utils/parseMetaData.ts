import type { Metadata } from "next/types"
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"
import type { Meta, Product, ProductImage } from "~payload-types"
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types"
import { SEO_TITLE } from "./constants"

type ParseMetaDataArgs = {
  meta?: Meta
  product?: Product | null | undefined
  title?: string
  description?: string
}

const parseMetaData = ({
  meta,
  product,
  title: titleOverride,
  description: descriptionOverride,
}: ParseMetaDataArgs) => {
  const metaImage: Twitter["images"] | undefined = meta?.image
    ? typeof meta?.image === "object"
      ? {
          url: meta.image.url || "",
          alt: meta.image.alt,
          type: meta.image.mimeType,
          width: meta.image.width,
          height: meta.image.height,
        }
      : undefined
    : undefined
  let images: Twitter["images"] = metaImage ? [metaImage] : []

  const nativeImages = [
    product?.featuredImage,
    ...(product?.gallery ?? []),
  ].filter((i) => i)

  const wcImages = product?.wc?.images ?? []

  images.push(
    ...[
      ...nativeImages.map((img) => {
        if (typeof img === "object") {
          const { alt, url, mimeType, width, height } = img as ProductImage
          return { url, alt, type: mimeType, width, height }
        }
      }),
      ...wcImages?.map((img) => {
        if (img.src && img.alt) {
          return { url: img.src, alt: img.alt }
        }
      }),
    ].filter((img): img is { url: string; alt: string } => !!img)
  )

  const hasImage = images.length > 0 || (wcImages?.length ?? 0) > 0

  const title =
    titleOverride ||
    meta?.title ||
    `${product?.title ?? "Product Details"} ${SEO_TITLE}`
  const description =
    descriptionOverride || meta?.description || product?.shortDescription

  const metaData: Metadata = {
    title,
    description,
    keywords: meta?.keywords
      ?.map((key) => key.keyword)
      .filter((key): key is string => !!key),
    generator: "Ronatec C2C, Inc.",
    applicationName: "Ronatec C2C, Inc.",
    referrer: "origin-when-cross-origin",
    openGraph: {
      title,
      description,
      images,
      siteName: "Ronatec C2C, Inc.",
      locale: "en-US", // TODO: Dynamically update this after implementing i18n
      ...(product
        ? {
            type: "article",
            publishedTime: product?.createdAt,
            modifiedTime: product?.updatedAt,
            authors: ["Ronatec"],
          }
        : { type: "website" }),
    },
    twitter: {
      title,
      description,
      card: hasImage ? "summary_large_image" : "summary",
      images,
    },
  }

  return metaData
}

export default parseMetaData

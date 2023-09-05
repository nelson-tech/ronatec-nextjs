import { Payload } from "payload"
import he from "he"
import { WCWH_Category } from "../utils/types"
import { UpdateCategory } from "@lib/types/category"
import { Category } from "~payload-types"
import findMatchingDocument from "./findMatchingDocument"

type FormatCategoryArgs = {
  incoming: WCWH_Category
  existingCategory?: Category
  payload: Payload
}

const formatCategory = async ({
  incoming,
  existingCategory,
  payload,
}: FormatCategoryArgs) => {
  // let image: Image | undefined

  // if (incoming.image) {
  //   const existingImage = await findMatchingMedia({
  //     payload,
  //     collection: "images",
  //     where: {
  //       or: [
  //         { filename: { equals: incoming.image.src.split("/").at(-1) } },
  //         // { alt: { equals: incoming.image.alt || incoming.image.name } },
  //       ],
  //     },
  //   })

  //   if (existingImage?.id) {
  //     console.log("Image already exists", existingImage.id)

  //     image = existingImage
  //   } else {
  //     // console.log("No image yet. Creating.")
  //     // const newImage = await createImageFromUrl({
  //     //   payload,
  //     //   url: incoming.image.src,
  //     //   alt: incoming.image.alt || incoming.image.name,
  //     //   collection: "images",
  //     // })
  //     // if (newImage.id) {
  //     //   console.log("New image:", newImage.id)
  //     //   image = newImage
  //     // }
  //   }
  // }

  const parentCategory = await findMatchingDocument({
    collection: "categories",
    where: { "wc.wc_id": { equals: incoming.parent } },
    payload,
  })

  const formattedCategory: UpdateCategory = {
    ...existingCategory,
    title: he.decode(incoming.name),
    slug: incoming.slug,
    description: he.decode(incoming.description),
    // image: image?.id,
    parent: parentCategory?.id,
    wc: {
      wc_id: incoming.id,
      image: incoming.image
        ? {
            wc_id: incoming.image.id,
            src: incoming.image.src,
            alt: incoming.image.alt || incoming.image.name,
          }
        : undefined,
    },
  }

  return formattedCategory
}

export default formatCategory

import { Payload } from "payload"
import he from "he"
import { WCWH_Category } from "../products/utils/types"
import { UpdateCategory } from "@lib/types/category"
import { Image, Category } from "payload/generated-types"
import findMatchingCategory from "./findMatchingCategory"
import findMatchingMedia from "./findMatchingImage"
import createImageFromUrl from "./createImageFromUrl"

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
  let image: Image | undefined

  if (incoming.image) {
    const existingImage = await findMatchingMedia({
      payload,
      collection: "images",
      where: {
        or: [
          { filename: { equals: incoming.image.src.split("/").at(-1) } },
          // { alt: { equals: incoming.image.alt || incoming.image.name } },
        ],
      },
    })

    if (existingImage?.id) {
      console.log("Image already exists", existingImage.id)

      image = existingImage
    } else {
      // console.log("No image yet. Creating.")
      // const newImage = await createImageFromUrl({
      //   payload,
      //   url: incoming.image.src,
      //   alt: incoming.image.alt || incoming.image.name,
      //   collection: "images",
      // })
      // if (newImage.id) {
      //   console.log("New image:", newImage.id)
      //   image = newImage
      // }
    }
  }

  const parentCategory = await findMatchingCategory({
    field: "wc.wc_id",
    value: incoming.parent,
    payload,
  })

  console.log("Parent ID", parentCategory?.id)

  const formattedCategory: UpdateCategory = {
    ...existingCategory,
    title: he.decode(incoming.name),
    slug: incoming.slug,
    description: he.decode(incoming.description),
    image: image?.id,
    parent: parentCategory?.id,
    wc: {
      wc_id: incoming.id,
      image: incoming.image,
    },
  }

  return formattedCategory
}

export default formatCategory

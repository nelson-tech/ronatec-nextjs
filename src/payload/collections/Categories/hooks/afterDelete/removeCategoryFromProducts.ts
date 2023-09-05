import { AfterDeleteHook } from "payload/dist/collections/config/types"
import { Category } from "~payload-types"

const removeCategoryFromProduct: AfterDeleteHook<Category> = async ({
  req,
  id,
  doc,
}) => {
  const orphans = await req.payload.find({
    collection: "products",
    where: { categories: { contains: id } },
  })

  orphans.docs.forEach(async (orphan) => {
    const categories = orphan.categories?.map((cat) =>
      typeof cat === "object" ? cat.id : cat
    )

    if (categories) {
      const filteredCategories = (categories as string[]).filter(
        (cat) => cat !== id
      )

      await req.payload.update({
        collection: "products",
        id: orphan.id,
        data: { categories: filteredCategories },
      })
    }
  })
}

export default removeCategoryFromProduct

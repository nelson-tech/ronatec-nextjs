import { AfterDeleteHook } from "payload/dist/collections/config/types"
import { Category } from "payload/generated-types"

const removeParentFromCategories: AfterDeleteHook<Category> = async ({
  req,
  id,
  doc,
}) => {
  const orphans = await req.payload.find({
    collection: "categories",
    where: { parent: { equals: id } },
  })

  orphans.docs.forEach(async (orphan) => {
    await req.payload.update({
      collection: "categories",
      id: orphan.id,
      data: { parent: undefined },
    })
  })
}

export default removeParentFromCategories

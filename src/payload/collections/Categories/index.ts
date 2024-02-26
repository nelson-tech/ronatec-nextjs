import type { CollectionConfig } from "payload/types"
import fields from "./fields"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"
import beforeChange from "./hooks/beforeChange"
import type { Payload } from "payload/dist/payload"

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    group: "Shop",
    useAsTitle: "title",
  },
  hooks: {
    afterRead,
    afterDelete,
    beforeChange,
    afterChange: [
      async ({ operation, req }) => {
        if (operation !== "create") {
          return
        }

        const payload = req.payload as Payload

        const allCats = await payload.find({
          collection: "categories",
          limit: 999,
        })

        const allCatIds = allCats.docs.map((cat) => cat.id)

        console.log("All cat ids", allCatIds)

        for (const id of allCatIds) {
          await payload.update({
            collection: "categories",
            id,
            data: {},
          })
        }
      },
    ],
  },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: () => true,
  },
  fields,
}

export default Categories

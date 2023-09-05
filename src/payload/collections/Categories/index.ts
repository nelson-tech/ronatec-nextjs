import type { CollectionConfig } from "payload/types"
import fields from "./fields"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    group: "Shop",
    useAsTitle: "title",
  },
  hooks: { afterRead, afterDelete },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: () => true,
  },
  fields,
}

export default Categories

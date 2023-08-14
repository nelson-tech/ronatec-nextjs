import type { CollectionConfig } from "payload/types"
import SyncButton from "./SyncButton"
import endpoints from "./endpoints"
import fields from "./fields"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    group: "Shop",
    useAsTitle: "title",
    components: {
      AfterList: [SyncButton],
    },
  },
  hooks: { afterRead, afterDelete },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: () => true,
  },
  endpoints,
  fields,
}

export default Categories

import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { anyone } from "../../access/anyone"
import productFields from "./fields"
import endpoints from "./endpoints"
import SyncButton from "./SyncButton"
import hooks from "./hooks"

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Shop",
    useAsTitle: "title",
    defaultColumns: ["title", "_status"],
    components: {
      AfterList: [SyncButton],
    },
  },
  hooks,
  versions: {
    drafts: { autosave: true },
    maxPerDoc: 5,
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: productFields,
  endpoints,
}

export default Products

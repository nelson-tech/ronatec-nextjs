import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { anyone } from "../../access/anyone"
import productFields from "./fields"
import hooks from "./hooks"

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Shop",
    useAsTitle: "title",
    defaultColumns: ["title", "_status"],
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
}

export default Products

// TODO: Remove product from all carts if out of stock (or design out of stock section to cart a la Amazon)

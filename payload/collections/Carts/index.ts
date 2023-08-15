import { CollectionConfig } from "payload/dist/collections/config/types"

import adminsAndUser from "~payload/access/adminsAndUser"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"
import ProductItemsField from "../../fields/productItems"
import beforeRead from "./hooks/beforeRead"

export const Carts: CollectionConfig = {
  slug: "carts",
  fields: [
    ProductItemsField({ readOnly: false }),
    {
      name: "count",
      label: "Items in cart",
      type: "number",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
      hasMany: false,
      admin: { hidden: false, position: "sidebar" },
      maxDepth: 0,
    },
    {
      name: "lastEdit",
      type: "number",
      hidden: true,
    },
  ],
  access: {
    read: adminsAndUser("carts", "user.id", "read"),
    create: adminsAndUser("carts", "user.id", "create"),
    update: adminsAndUser("carts", "user.id", "update"),
    delete: adminsAndUser("carts", "user.id", "delete"),
  },
  hooks: { afterRead, beforeChange, afterChange, afterDelete, beforeRead },
  admin: { group: "Shop", hidden: false },
}

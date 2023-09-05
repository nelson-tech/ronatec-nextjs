import { CollectionConfig } from "payload/dist/collections/config/types"

import adminsAndUser from "~payload/access/adminsAndUser"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"
import ProductItemsField from "../../fields/productItems"
import beforeRead from "./hooks/beforeRead"
import fields from "./fields"

export const Carts: CollectionConfig = {
  slug: "carts",
  fields,
  access: {
    read: adminsAndUser("carts", "user.id", "Cart access"),
    create: adminsAndUser("carts", "user.id", "Cart access"),
    update: adminsAndUser("carts", "user.id", "Cart access"),
    delete: adminsAndUser("carts", "user.id", "Cart access"),
  },
  hooks: { afterRead, beforeChange, afterChange, afterDelete, beforeRead },
  admin: { group: "Shop", hidden: false },
}

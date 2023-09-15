import { CollectionConfig } from "payload/dist/collections/config/types"

import adminsAndUser from "~payload/access/adminsAndUser"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"
import beforeRead from "./hooks/beforeRead"
import fields from "./fields"

const Carts: CollectionConfig = {
  slug: "carts",
  fields,
  access: {
    read: adminsAndUser("carts", "user.id"),
    create: adminsAndUser("carts", "user.id"),
    update: adminsAndUser("carts", "user.id"),
    delete: adminsAndUser("carts", "user.id"),
  },
  hooks: { afterRead, beforeChange, afterChange, afterDelete, beforeRead },
  admin: { group: "Shop", hidden: false },
}

export default Carts

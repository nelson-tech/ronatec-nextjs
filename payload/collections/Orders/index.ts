import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { adminsAndOrderedBy } from "./access/adminsAndOrderedBy"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import fields from "./fields"

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    group: "Shop",
    useAsTitle: "orderNumber",
    defaultColumns: ["createdAt"],
  },
  access: {
    read: adminsAndOrderedBy,
    create: adminsAndOrderedBy,
    update: admins,
    delete: admins,
  },
  hooks: { beforeChange, afterChange },
  timestamps: true,
  fields,
}

export default Orders

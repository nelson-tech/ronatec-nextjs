import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { adminsAndOrderedBy } from "./access/adminsAndOrderedBy"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import ProductItemsField from "../../fields/productItems"
import contactFields from "~payload/fields/contact"

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
  fields: [
    {
      name: "orderNumber",
      type: "number",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "complete", label: "Complete" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },

    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: { position: "sidebar" },
    },
    { name: "notified", type: "checkbox", admin: { position: "sidebar" } },
    {
      name: "cartId",
      type: "text",
      required: true,
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "shipToDifferentAddress",
      type: "checkbox",
      defaultValue: false,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Summary",
          fields: [ProductItemsField({ readOnly: true })],
        },
        {
          label: "Contact",
          fields: [
            // keep a static copy of these fields as they appear at the time of the order
            {
              type: "tabs",
              tabs: [
                { name: "billing", fields: contactFields },
                { name: "shipping", fields: contactFields },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Orders

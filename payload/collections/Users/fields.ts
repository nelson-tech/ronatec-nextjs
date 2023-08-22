import { Field } from "payload/types"

import { admins } from "~payload/access/admins"
import contactFields from "~payload/fields/contact"
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin"
import virtualField from "~payload/fields/virtual"
import { User } from "payload/generated-types"

export const UserFields: Field[] = [
  {
    name: "firstName",
    type: "text",
    admin: {
      position: "sidebar",
      width: "50%",
    },
  },
  {
    name: "lastName",
    type: "text",
    admin: {
      position: "sidebar",
      width: "50%",
    },
  },
  virtualField<User>({
    name: "fullName",
    type: "text",
    returnValue: ({ data, req, context }) =>
      `${data?.firstName ? `${data?.firstName} ` : ""}${
        data?.lastName ? data.lastName : ""
      }`,
  }),
  {
    name: "roles",
    type: "select",
    hasMany: true,
    saveToJWT: true,
    defaultValue: ["customer"],
    options: [
      {
        label: "Administrator",
        value: "admin",
      },
      {
        label: "Customer",
        value: "customer",
      },
    ],
    hooks: {
      beforeChange: [ensureFirstUserIsAdmin],
    },
    access: {
      read: admins,
      create: admins,
      update: admins,
    },
    admin: { position: "sidebar" },
  },
  {
    name: "cart",
    type: "relationship",
    relationTo: "carts",
    hasMany: false,
    required: false,
    admin: { hidden: false, position: "sidebar" },
  },
  {
    type: "tabs",
    tabs: [
      {
        label: "Orders",
        fields: [
          {
            name: "orders",
            type: "relationship",
            relationTo: "orders",
            hasMany: true,
          },
        ],
      },
      {
        label: "Contact",
        fields: [
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
]

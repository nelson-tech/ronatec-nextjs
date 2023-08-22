import { Field } from "payload/types"

import ProductItemsField from "~payload/fields/productItems"
import contactFields from "~payload/fields/contact"
import type { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"
import totals from "~payload/fields/totals"

const fields: Field[] = [
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
    admin: { position: "sidebar" },
  },
  {
    name: "count",
    label: "Items in cart",
    type: "number",
    admin: { readOnly: true, position: "sidebar" },
  },
  {
    name: "coupons",
    type: "array",
    fields: [
      // TODO: Add coupon capability
    ],
    admin: {
      position: "sidebar",
    },
  },
  totals,
  {
    name: "user",
    type: "relationship",
    relationTo: "users",
    hasMany: false,
    admin: { position: "sidebar" },
    maxDepth: 0,
  },
  // Keep stats/info about cart for analytics
  {
    name: "cart",
    type: "group",
    fields: [
      { name: "id", type: "text" },
      { name: "createdAt", type: "date" },
      { name: "updatedAt", type: "date" },
    ],
    hidden: true,
  },
  {
    type: "tabs",
    tabs: [
      {
        label: "Items",
        fields: [ProductItemsField({ readOnly: false })],
      },
      {
        name: "contact",
        label: "Contact",
        fields: [
          {
            name: "shipToDifferentAddress",
            type: "checkbox",
            defaultValue: false,
          },
          // keep a static copy of these fields as they appear at the time of the order
          {
            type: "tabs",
            tabs: [
              { name: "billing", fields: contactFields },
              {
                name: "shipping",
                fields: contactFields,
                admin: {
                  condition: (data, siblingData) => {
                    console.log("Contact Data", data, siblingData)

                    return true
                  },
                },
              },
            ],
          },
        ],
      },
      {
        label: "Payment",
        fields: [
          { name: "amountPaid", type: "number" },
          { name: "amountDue", type: "number" },
          { name: "amountRefunded", type: "number" },
        ],
      },
      {
        label: "Comments",
        fields: [
          {
            name: "customerNote",
            type: "textarea",
            admin: {
              description: "Note placed by customer at time of order.",
              condition: (data) => !!data,
              readOnly: true,
            },
          },
          {
            name: "comments",
            type: "array",
            interfaceName: "OrderComments",
            fields: [
              { name: "name", type: "text" },
              { name: "date", type: "date" },
              { name: "comment", type: "textarea" },
            ],
            hooks: {},
            admin: {
              components: {
                RowLabel: ({ data, index }: RowLabelArgs) =>
                  data.name
                    ? `${data.name} ${
                        data.date
                          ? ` | ${new Date(data.date).toLocaleString()}`
                          : ""
                      }`
                    : `Comment ${String(index).padStart(2, "0")}`,
              },
            },
          },
        ],
      },
    ],
  },
]

export default fields

import { Field } from "payload/types"
import ProductItemsField from "~payload/fields/productItems"
import totals from "~payload/fields/totals"

const cartFields: Field[] = [
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
  totals,
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
]

export default cartFields

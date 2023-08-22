import { Field } from "payload/types"
import { admins } from "~payload/access/admins"
import { anyone } from "~payload/access/anyone"
import prices from "./prices"
import totals from "./totals"

type PropsType = {
  readOnly?: boolean
}

const ProductItemsField: <T>(props: PropsType) => Field = ({ readOnly }) => ({
  name: "items",
  type: "array",
  interfaceName: "ProductItems",
  admin: {
    readOnly,
    components: {
      RowLabel: ({ data }: any) => data?.title ?? "Item",
    },
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "variation",
      type: "array",
      fields: [
        { name: "name", type: "text" },
        { name: "option", type: "text" },
      ],
      required: false,
    },
    // keep a static copy of these fields as they appear at the time of the order
    {
      name: "title",
      type: "text",
      required: true,
    },
    prices,
    totals,
    {
      name: "discount",
      type: "group",
      fields: [
        {
          name: "type",
          type: "select",
          options: [
            { label: "$ Off", value: "amount" },
            { label: "% Off", value: "percentage" },
          ],
        },
      ],
      access: { create: admins, read: anyone, update: admins },
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      min: 1,
      admin: {
        step: 1,
      },
    },
  ],
})
export default ProductItemsField

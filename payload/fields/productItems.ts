import { Field } from "payload/types"

type PropsType = {
  readOnly?: boolean
}

const ProductItemsField: (props: PropsType) => Field = ({ readOnly }) => ({
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
    { name: "price", type: "text", required: true },
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

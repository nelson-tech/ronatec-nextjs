import { Field } from "payload/types"
import IconGroupField from "./iconGroup"

const CardsArrayField: Field = {
  name: "cards",
  type: "array",
  interfaceName: "Card",
  fields: [
    { name: "title", type: "text" },
    { name: "content", type: "textarea" },
    { name: "image", type: "relationship", relationTo: "images" },
    IconGroupField,
    {
      name: "link",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "url", label: "URL", type: "text" },
      ],
    },
  ],
  admin: {
    components: {
      RowLabel: ({ data }: any) => data?.title ?? "Card",
    },
  },
}

export default CardsArrayField

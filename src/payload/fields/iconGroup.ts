import { Field } from "payload/types"

const IconGroupField: Field = {
  name: "icon",
  type: "group",
  fields: [
    { name: "name", type: "text" },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Brand", value: "brand" },
        { label: "Duotone", value: "duotone" },
        { label: "Light", value: "light" },
        { label: "Regular", value: "regular" },
        { label: "Solid", value: "solid" },
      ],
      defaultValue: "regular",
    },
  ],
}

export default IconGroupField

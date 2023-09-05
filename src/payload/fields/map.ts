import { Field } from "payload/types"
import IconGroupField from "./iconGroup"

const mapField: Field = {
  name: "map",
  type: "group",
  interfaceName: "Map",
  fields: [
    {
      name: "center",
      type: "group",
      fields: [
        { name: "lat", label: "Latitude", type: "number" },
        { name: "lon", label: "Longitude", type: "number" },
      ],
    },
    {
      name: "markers",
      type: "array",
      interfaceName: "MapMarker",
      fields: [
        { name: "label", type: "text" },
        { name: "lat", label: "Latitude", type: "number" },
        { name: "lon", label: "Longitude", type: "number" },
        IconGroupField,
      ],
      admin: {
        components: {
          RowLabel: ({ data }: any) => data.label ?? "Marker",
        },
      },
    },
  ],
}

export default mapField

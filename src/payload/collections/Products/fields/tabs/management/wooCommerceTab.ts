import { Tab } from "payload/dist/fields/config/types"
import { CollectionConfig, Field } from "payload/types"
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"

const wcFields: CollectionConfig["fields"] = [
  {
    name: "wc",
    label: false,
    type: "group",
    fields: [
      {
        name: "wc_id",
        label: "ID",
        type: "number",
      },
      {
        name: "description",
        type: "textarea",
      },
      {
        name: "images",
        type: "array",
        interfaceName: "WCImages",
        fields: [
          { name: "wc_id", type: "number" },
          { name: "src", type: "text" },
          { name: "alt", type: "text" },
          {
            name: "probe",
            type: "group",
            interfaceName: "WCImageProbe",
            fields: [
              { name: "width", type: "number" },
              { name: "height", type: "number" },
              { name: "length", type: "number" },
              { name: "type", type: "text" },
              { name: "mime", type: "text" },
              { name: "wUnits", type: "text" },
              { name: "hUnits", type: "text" },
              { name: "url", type: "text" },
              { name: "orientation", type: "number" },
            ],
          },
        ],
        admin: {
          components: {
            RowLabel: ({ data, index }: RowLabelArgs) => {
              return (
                data?.name ||
                data?.alt ||
                `Attribute ${String(index).padStart(2, "0")}`
              )
            },
          },
        },
      },
      {
        name: "attributes",
        type: "array",
        fields: [
          { name: "wc_id", type: "number" },
          { name: "name", type: "text" },
          { name: "taxonomy", type: "text" },
          { name: "has_variations", type: "checkbox" },
          {
            name: "terms",
            type: "array",
            fields: [
              { name: "wc_id", type: "number" },
              { name: "name", type: "text" },
              { name: "slug", type: "text" },
            ],
            admin: {
              components: {
                RowLabel: ({ data, index }: RowLabelArgs) => {
                  return data?.name || `Term ${String(index).padStart(2, "0")}`
                },
              },
            },
          },
        ],
        admin: {
          components: {
            RowLabel: ({ data, index }: RowLabelArgs) => {
              return data?.name || `Attribute ${String(index).padStart(2, "0")}`
            },
          },
        },
      },
    ],
  },
]

const wooCommerceTab: Tab = {
  label: "WC Import",
  description: "Data imported from WooCommerce",
  fields: wcFields,
  admin: {
    condition: (data) => {
      if (data?.wc?.wc_id) {
        return true
      } else {
        return false
      }
    },
    readOnly: true,
  },
}

export default wooCommerceTab

import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"
import { Product } from "~payload-types"
import { Field } from "payload/types"
import { slugField } from "~payload/fields/slug"
import virtualField from "~payload/fields/virtual"
import productManagementTab from "./management"
import lexicalField from "~payload/fields/lexical"

const productTabs: Field = {
  type: "tabs",
  tabs: [
    {
      label: "Description",
      fields: [
        {
          name: "shortDescription",
          type: "textarea",
          admin: { description: "Shown on product card." },
        },
        lexicalField({ name: "description", localized: true }),
        // {
        //   name: "description",
        //   type: "textarea",
        //   required: false,
        //   admin: { description: "Shown on product details page." },
        // },
        {
          name: "attributes",
          type: "array",
          interfaceName: "ProductAttributes",
          fields: [
            { name: "label", type: "text" },
            { name: "value", type: "text" },
          ],
          admin: {
            description:
              "Appears as a table below description on product page.",
          },
        },
      ],
    },
    {
      label: "Images",
      description:
        "Used for gallery on product details page. \
        First image in gallery will be the featured image, then the images here will be added.",
      fields: [
        {
          name: "gallery",
          label: "Product Images",
          type: "array",
          labels: {
            singular: "Slide",
            plural: "Slides",
          },
          fields: [
            { name: "image", type: "upload", relationTo: "productImages" },
          ],
          admin: {
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.title || `Slide ${String(index).padStart(2, "0")}`
              },
            },
          },
        },
      ],
    },
    {
      label: "Variations",
      description: "Add variations such as Size, Color, etc.",
      fields: [
        {
          name: "variations",
          type: "array",
          fields: [
            { name: "name", type: "text" },
            slugField("name"),
            {
              type: "array",
              name: "options",
              fields: [
                { name: "label", type: "text" },
                { name: "sku", type: "text", unique: true },
              ],
              admin: {
                components: {
                  RowLabel: ({ data, index }: RowLabelArgs) => {
                    return (
                      data?.label || `Option ${String(index).padStart(2, "0")}`
                    )
                  },
                },
              },
            },
          ],
          admin: {
            condition: (data) => data?.type === "variable",
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return (
                  data?.name || `Variation ${String(index).padStart(2, "0")}`
                )
              },
            },
          },
        },
        virtualField<Product>({
          name: "hasVariation",
          type: "checkbox",
          returnValue: ({ data }) => (data?.variations?.length ?? 0) > 0,
        }),
      ],
      admin: { condition: (data) => false },
    },
    productManagementTab,
  ],
}

export default productTabs

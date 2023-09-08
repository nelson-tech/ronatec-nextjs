import { CollectionConfig } from "payload/types"
import virtualField from "~payload/fields/virtual"
import prices from "~payload/fields/prices"
import { slugField } from "~payload/fields/slug"
import { meta } from "~payload/fields/meta"
import productTabs from "./tabs"

const productFields: CollectionConfig["fields"] = [
  {
    type: "row",
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        admin: { width: "66%" },
      },
      slugField("title", {
        admin: { width: "33%", position: undefined },
      }),
    ],
  },

  productTabs,

  { name: "featured", type: "checkbox", admin: { position: "sidebar" } },
  {
    name: "type",
    type: "select",
    options: [
      { label: "Simple", value: "simple" },
      { label: "Variable", value: "variable" },
      { label: "Grouped", value: "grouped" },
      { label: "Virtual", value: "virtual" },
    ],
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "featuredImage",
    type: "upload",
    relationTo: "productImages",
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "categories",
    type: "relationship",
    relationTo: "categories",
    hasMany: true,
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "tags",
    type: "relationship",
    relationTo: "tags",
    hasMany: true,
    admin: { position: "sidebar", isSortable: true },
  },
  prices,
  virtualField({
    name: "onSale",
    type: "checkbox",
    returnValue: ({ siblingData }) =>
      !!siblingData.prices.salePrice &&
      siblingData.prices.regularPrice > siblingData.prices.salePrice,
  }),
  {
    label: "SEO",
    type: "collapsible",
    fields: [
      meta({
        hideLabel: true,
        generateTitle: ({ doc }) =>
          `${(doc as { title: { value: string } }).title.value} - Ronatec`,
        generateDescription: ({ doc }) =>
          (doc as { shortDescription: { value: string } }).shortDescription
            .value,
        generateImage: ({ doc }) =>
          (doc as { featuredImage: { value: string } }).featuredImage?.value,
        generateURL: async ({ doc }) => {
          const fields = (doc as { fields: { slug: { value: string } } }).fields

          return `/products/${fields.slug.value}`
        },
      }),
    ],
    admin: { position: "sidebar", initCollapsed: true },
  },
  {
    name: "lanco",
    type: "checkbox",
    admin: { hidden: false, position: "sidebar" },
  },
]

export default productFields

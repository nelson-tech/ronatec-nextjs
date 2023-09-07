import { Tab } from "payload/dist/fields/config/types"
import { Product } from "~payload-types"
import virtualField from "~payload/fields/virtual"
import wooCommerceTab from "./wooCommerceTab"

const productManagementTab: Tab = {
  label: "Management",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "purchaseNote",
              type: "textarea",
              admin: {
                description: "Note that appears next to Add To Cart button.",
              },
            },
            { name: "saleStartDate", type: "date" },
            { name: "saleEndDate", type: "date" },
            {
              label: "Taxes",
              type: "collapsible",
              fields: [
                { name: "isTaxable", type: "checkbox" },
                {
                  name: "taxClass",
                  type: "text", // TODO: Make taxClass a relation to a tax class collection
                },
              ],
            },
            {
              label: "Downloads",
              type: "collapsible",
              fields: [
                { name: "downloadable", type: "checkbox" },
                {
                  name: "downloadLimit",
                  type: "number",
                  admin: { condition: (data) => data.downloadable },
                },
                {
                  name: "downloadExpiry",
                  type: "number",
                  admin: { condition: (data) => data.downloadable },
                },
              ],
              admin: { condition: (data) => data.type === "virtual" },
            },
            {
              name: "upsellIds",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              admin: { isSortable: true },
            },
            {
              name: "crossSellIds",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              admin: { isSortable: true },
            },
            {
              name: "relatedIds",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              admin: { isSortable: true },
            },
          ],
        },
        {
          label: "Stock",
          fields: [
            { name: "sku", type: "text", unique: true },
            { name: "manageStock", type: "checkbox" },
            {
              name: "stock",
              type: "number",
              admin: { condition: (data) => data.manageStock },
            },
            { name: "used", type: "checkbox" },
            virtualField<Product>({
              name: "inStock",
              type: "checkbox",
              returnValue: ({ data }) =>
                data?.manageStock ? (data.stock ?? 0) > 0 : true,
            }),
          ],
        },
        {
          label: "Shipping",
          fields: [
            { name: "shippingRequired", type: "checkbox" },
            { name: "shippingTaxable", type: "checkbox" },
            { name: "shippingClass", type: "text" }, // TODO: Make shippingClass relation to shipping class collection
            { name: "weight", type: "text" },
            {
              name: "dimensions",
              type: "group",
              fields: [
                { name: "length", type: "text" },
                { name: "width", type: "text" },
                { name: "height", type: "text" },
              ],
            },
          ],
          admin: { condition: (data) => data.type !== "virtual" },
        },
        wooCommerceTab,
        {
          label: "Stats",
          fields: [
            { name: "ordered", type: "number", admin: { readOnly: true } },
            { name: "sold", type: "number", admin: { readOnly: true } },
            // TODO: Make reviews and ratings collection
            // Fields: product (relation to one), user, rating, review

            // TODO: Make a virtual average rating field
          ],
        },
      ],
    },
  ],
}

export default productManagementTab

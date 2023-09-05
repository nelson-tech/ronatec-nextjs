import { Field } from "payload/types"
import formatCurrency from "~payload/utils/formatCurrency"
import virtualField from "./virtual"

const prices: Field = {
  name: "prices",
  type: "group",
  interfaceName: "Prices",
  hooks: {
    afterRead: [
      ({ siblingData }) => {
        const prices = siblingData?.prices
        const price =
          prices?.salePrice && prices.salePrice < (prices?.regularPrice ?? 0)
            ? prices.salePrice
            : prices.regularPrice
        const regularPrice = formatCurrency(prices?.regularPrice)
        const salePrice = formatCurrency(prices?.salePrice)

        const formattedPrice = formatCurrency(price)
        return {
          ...prices,
          price,
          formatted: { price: formattedPrice, regularPrice, salePrice },
        }
      },
    ],
  },
  fields: [
    { name: "regularPrice", type: "number" },
    { name: "salePrice", type: "number" },
    virtualField({ name: "price", type: "number" }),
    {
      name: "formatted",
      type: "group",
      fields: [
        virtualField({
          name: "price",
          type: "text",
        }),
        virtualField({
          name: "regularPrice",
          type: "text",
        }),
        virtualField({
          name: "salePrice",
          type: "text",
        }),
        { name: "price_range", type: "text", required: false },
      ],
    },
  ],
}

export default prices

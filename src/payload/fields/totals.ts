import { Field } from "payload/types"
import formatCurrency from "~payload/utils/formatCurrency"
import virtualField from "./virtual"
import { Cart, Order, PriceTotals } from "~payload-types"

const totals: Field = {
  name: "totals",
  type: "group",
  interfaceName: "PriceTotals",
  hooks: {
    afterRead: [
      ({ siblingData }) => {
        const totals = siblingData.totals
        const formattedSubTotal = formatCurrency(totals.subTotal)
        const formattedTotal = formatCurrency(totals.total)

        const afterReadGroupReturn = {
          ...totals,
          formatted: { subTotal: formattedSubTotal, total: formattedTotal },
        }

        return afterReadGroupReturn
      },
    ],
  },
  fields: [
    {
      name: "subTotal",
      type: "number",
      admin: { position: "sidebar" },
    },
    {
      name: "total",
      type: "number",
      admin: { hidden: false, position: "sidebar", readOnly: true },
    },
    {
      name: "formatted",
      type: "group",
      fields: [
        virtualField<Cart | Order, any, PriceTotals>({
          name: "subTotal",
          type: "text",
          admin: { hidden: false, position: "sidebar", readOnly: true },
        }),
        virtualField<Cart | Order, any, PriceTotals>({
          name: "total",
          type: "text",
          admin: { hidden: false, position: "sidebar", readOnly: true },
        }),
      ],
    },
  ],
}

export default totals

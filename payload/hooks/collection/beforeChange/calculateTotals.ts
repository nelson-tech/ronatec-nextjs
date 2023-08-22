import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Cart, Order } from "payload/generated-types"

const calculateTotals: BeforeChangeHook<Cart | Order> = ({
  data,
  operation,
  originalDoc,
}) => {
  // Don't calculate if totals are manually altered
  // if (data?.totals?.subTotal || data?.totals?.total) {
  //   return data
  // }

  if (data?.items) {
    let documentSubTotal = 0
    let documentTotal = 0

    const updatedItems = data.items?.map((item) => {
      const onSale =
        item.prices?.salePrice &&
        item.prices.salePrice < (item.prices.regularPrice ?? 0)
      const itemSubTotal =
        (onSale
          ? item.prices?.salePrice ?? 0
          : item.prices?.regularPrice ?? 0) * item.quantity

      // TODO: Add coupon/discount/tax functionality
      const itemTotal = itemSubTotal // * tax rate * discount * coupon(s)

      // Update document totals
      documentSubTotal += itemSubTotal
      documentTotal += itemTotal
      return { ...item, totals: { subTotal: itemSubTotal, total: itemTotal } }
    })

    data.items = updatedItems

    // TODO: Add coupon/discount/tax functionality
    // documentTotal = documentTotal * tax rate * discount * coupon(s)

    data.totals = { subTotal: documentSubTotal, total: documentTotal }

    return data
  }
}

export default calculateTotals

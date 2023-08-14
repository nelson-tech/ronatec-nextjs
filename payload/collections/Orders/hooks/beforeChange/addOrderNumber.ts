import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"

const addOrderNumber: BeforeChangeHook<Order> = async ({ req, data }) => {
  if (!data?.orderNumber) {
    // Get highest order number
    const highestOrder = await req.payload.find({
      collection: "orders",
      sort: "-orderNumber",
      limit: 1,
    })

    const highestOrderNumber =
      highestOrder.docs.at(0)?.orderNumber ??
      (await req.payload.findGlobal({ slug: "settings" })).orders
        .startingNumber ??
      0

    const orderNumber = highestOrderNumber + 1

    data.orderNumber = orderNumber
  }

  return data
}

export default addOrderNumber

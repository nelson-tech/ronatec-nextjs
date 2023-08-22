import { AfterChangeHook } from "payload/dist/collections/config/types"
import type { Order } from "payload/generated-types"

const destroyCart: AfterChangeHook<Order> = async ({ req, doc }) => {
  // try to find cart
  try {
    const cart = await req.payload.findByID({
      collection: "carts",
      id: doc.cart?.id,
    })

    if (cart.id) {
      // destroy cart
      try {
        await req.payload.delete({ collection: "carts", id: cart.id })
      } catch (error) {
        console.warn("Error destroying cart", error)
      }
    }
  } catch (error) {
    console.warn("Cart not found.", error)
  }
}

export default destroyCart

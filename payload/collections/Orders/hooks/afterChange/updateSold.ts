import { Payload } from "payload"
import { AfterChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"

const updateSold: AfterChangeHook<Order> = async ({ doc, operation, req }) => {
  const payload = req.payload as Payload

  if (doc.status === "complete" && doc.items) {
    doc.items.forEach(async (item) => {
      const { product, quantity } = item

      const productId = typeof product === "object" ? product.id : product

      const previousSold =
        (typeof product === "object"
          ? product.sold
          : (await payload.findByID({ collection: "products", id: product }))
              .sold) ?? 0

      await payload.update({
        collection: "products",
        id: productId,
        data: { sold: previousSold + quantity },
      })
    })
  }

  // TODO: Account for refunds or changing status back/forth
}

export default updateSold

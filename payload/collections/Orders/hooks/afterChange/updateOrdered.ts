import { Payload } from "payload"
import { AfterChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"

const updateOrdered: AfterChangeHook<Order> = async ({
  doc,
  operation,
  req,
}) => {
  const payload = req.payload as Payload

  if (operation === "create" && doc.items) {
    doc.items.forEach(async (item) => {
      const { product, quantity } = item

      const productId = typeof product === "object" ? product.id : product

      const previouslyOrdered =
        (typeof product === "object"
          ? product.ordered
          : (await payload.findByID({ collection: "products", id: product }))
              .ordered) ?? 0

      await payload.update({
        collection: "products",
        id: productId,
        data: { ordered: previouslyOrdered + quantity },
      })
    })
  }
}

export default updateOrdered

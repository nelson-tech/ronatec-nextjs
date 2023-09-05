import payload from "payload"
import type { AfterDeleteHook } from "payload/dist/collections/config/types"
import { Cart } from "~payload-types"

export const deleteProductFromCarts: AfterDeleteHook = async ({ req, id }) => {
  const usersWithProductInCart = await req.payload.find({
    collection: "users",
    where: {
      "cart.items.product": {
        equals: id,
      },
    },
    depth: 2,
  })

  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async (user) => {
        try {
          const cart =
            typeof user.cart === "object"
              ? user.cart
              : user.cart
              ? await payload.findByID({ collection: "carts", id: user.cart })
              : null

          if (cart) {
            const itemsWithoutProduct = cart?.items
              ?.filter(
                (item): item is Exclude<Cart["items"], undefined>[0] =>
                  item.product !== id
              )
              .map((item) => {
                const { id, product, quantity } = item
                return {
                  product: typeof product === "object" ? product.id : product,
                  quantity,
                }
              })

            itemsWithoutProduct &&
              req.payload.update({
                collection: "carts",
                id: cart.id,
                data: {
                  items: itemsWithoutProduct,
                },
              })
          }
        } catch (error) {
          console.warn("Error deleting product from carts.")
        }
      })
    )
  }
}

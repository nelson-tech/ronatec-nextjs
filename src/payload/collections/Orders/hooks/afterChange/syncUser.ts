import { Payload } from "payload"
import type { AfterChangeHook } from "payload/dist/collections/config/types"
import { Order, User } from "~payload-types"

// sync user purchases and delete their cart when they place an order

const syncUser: AfterChangeHook<Order> = async ({
  req,
  doc,
  previousDoc,
  // operation
}) => {
  const payload = req.payload as Payload
  const { user } = doc

  const userId = typeof user === "object" ? user.id : user

  if (userId) {
    const fullUser: User = await payload.findByID({
      collection: "users",
      id: userId,
    })

    if (fullUser && typeof fullUser === "object") {
      const { orders } = fullUser

      const allIDs = [
        ...(orders?.map((order) =>
          typeof order === "object" ? order.id : order
        ) || []),
        doc.id,
      ]

      const userOrderIDs = allIDs.filter((id, index): id is string => {
        if (!id) return false
        return allIDs.indexOf(id) === index
      })

      ;(userOrderIDs?.length ?? 0) > 0 &&
        (await payload.update({
          collection: "users",
          id: fullUser.id,
          data: {
            // let Payload API resolve any duplicate IDs
            orders: userOrderIDs,
          },
        }))
    }

    if (previousDoc.user) {
      // Order's user has been changed
      // New user already assigned above
      // Remove order from previous user

      const previousUserId =
        typeof previousDoc.user === "object"
          ? previousDoc.user.id
          : previousDoc.user

      const previousUser = await payload.findByID({
        collection: "users",
        id: previousUserId,
      })

      const updatedOrders = previousUser.orders
        ? previousUser.orders
            .map((order: string | Order) =>
              typeof order === "object" ? order.id : order
            )
            .filter((orderId) => orderId !== previousDoc.id)
        : []

      const updatedUser = await payload.update({
        collection: "users",
        id: previousUserId,
        data: { orders: updatedOrders },
      })
    }
  }
}

export default syncUser

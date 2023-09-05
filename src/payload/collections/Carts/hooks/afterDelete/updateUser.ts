import type { CollectionAfterDeleteHook } from "payload/types"
import type { Cart } from "~payload-types"

import removeCartFromUser from "~payload/collections/Carts/utils/removeCartFromUser"

const updateUser: CollectionAfterDeleteHook<Cart> = async ({
  req,
  id,
  doc,
}) => {
  const userId = typeof doc.user === "object" ? doc.user.id : doc.user
  // remove cart from previous owner if exists
  if (userId) {
    await removeCartFromUser(userId, doc.id, req.payload)
  }
}

export default updateUser

import { CollectionAfterDeleteHook } from "payload/types"
import removeCartFromUser from "../../utils/removeCartFromUser"
import { Cart, User } from "payload/generated-types"

const updateUser: CollectionAfterDeleteHook<Cart> = async ({
  req,
  id,
  doc,
}) => {
  const userId = typeof doc.user === "object" ? doc.user.id : doc.user
  // remove cart from previous owner if exists
  if (userId) {
    await removeCartFromUser(userId, req.payload)
  }
}

export default updateUser

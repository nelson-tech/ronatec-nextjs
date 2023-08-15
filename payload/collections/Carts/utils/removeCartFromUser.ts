import { Payload } from "payload"
import { User } from "../../../payload-types"

const removeCartFromUser = async (
  userID: string,
  cartId: string,
  payload: Payload
) => {
  try {
    // get user data
    const userData = (await payload.findByID({
      collection: "users",
      id: userID,
    })) as User

    // if user found and cart exists, remove it
    const userCartId =
      typeof userData.cart === "object" ? userData.cart.id : userData.cart

    userCartId === cartId &&
      (await payload.update({
        collection: "users",
        id: userID,
        data: { cart: "" },
      }))
  } catch (error) {
    console.warn("Error removing cart from user.")
  }
}

export default removeCartFromUser

import { Payload } from "payload"
import { User } from "../../../payload-types"

const removeCartFromUser = async (userID: string, payload: Payload) => {
  try {
    // get user data
    const userData = (await payload.findByID({
      collection: "users",
      id: userID,
    })) as User

    // if user found and cart exists, remove it
    userData.cart &&
      (await payload.update({
        collection: "users",
        id: userID,
        data: { cart: undefined },
      }))
  } catch (error) {
    console.warn("Error removing cart from user.")
  }
}

export default removeCartFromUser

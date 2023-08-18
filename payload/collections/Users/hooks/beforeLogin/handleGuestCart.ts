import mergeCartItems from "@hooks/utils/mergeCartItems"
import { Payload } from "payload"
import { User } from "payload/generated-types"
import { CollectionBeforeLoginHook, PayloadRequest } from "payload/types"
import getCookies from "~payload/utils/getCookies"

const handleGuestCart: CollectionBeforeLoginHook<User> = async ({
  req,
  user,
  context,
}) => {
  const { guestCartId } = getCookies(req)

  if (guestCartId) {
    // User had a guest cart before logging in

    const payload: Payload = req.payload

    try {
      const guestCart = await payload.findByID({
        collection: "carts",
        id: guestCartId,
      })

      const userHasCart =
        typeof user.cart === "object" ||
        (typeof user.cart === "string" && user.cart.length > 0)

      if (userHasCart) {
        // User already has a cart
        const userCartId =
          typeof user.cart === "object" ? user.cart.id : (user.cart as string)
        const userCart =
          typeof user.cart === "object"
            ? user.cart
            : await payload
                .findByID({
                  collection: "carts",
                  id: userCartId,
                  overrideAccess: false,
                  user,
                })
                .catch((e) =>
                  console.warn("Error fetching user cart | handleGuestCart", e)
                )

        // Merge items
        const mergedItems = mergeCartItems({
          existingItems: userCart?.items,
          newItems: guestCart.items,
        })

        // Update user cart
        try {
          await payload.update({
            collection: "carts",
            id: userCartId,
            data: { items: mergedItems },
            overrideAccess: false,
            user,
          })
        } catch (error) {
          console.warn("Error updating user cart | handleGuestCart", error)
        }

        // Delete guest cart
        try {
          await payload.delete({ collection: "carts", id: guestCartId })
        } catch (error) {
          console.warn("Error deleting guest cart | handleGuestCart", error)
        }
      } else {
        // User has no cart

        // Assign user to guest cart
        console.log("Assigning user to guest cart")

        try {
          await payload.update({
            collection: "carts",
            id: guestCartId,
            data: { user: user.id },
          })
        } catch (error) {
          console.warn(
            "Error assigning user to guest cart | handleGuestCart",
            error
          )
        }

        // Update user with newly assigned cart
        console.log("Updating user with newly assigned cart")

        try {
          const updatedUser = await payload.update({
            collection: "users",
            id: user.id,
            data: { cart: guestCartId },
          })

          return updatedUser
        } catch (error) {
          console.warn("Error updating user with cart | handleGuestCart", error)
        }
      }
    } catch (error) {
      console.warn("Error fetching guest cart", error, guestCartId)
    }
  }

  return user
}

export default handleGuestCart

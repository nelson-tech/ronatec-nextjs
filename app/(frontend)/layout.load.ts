import { Cart, Menu, Settings, User } from "payload/payload-types"
import getPayloadAndUser from "@server/getPayloadAndUser"

type LayoutDataReturnType = {
  menus: Menu | null
  settings: Settings | null
  promo: boolean
  user: User | null
  cart: Cart | null
}

const getLayoutData = async (): Promise<LayoutDataReturnType> => {
  const { payload, user, cartFromCookie } = await getPayloadAndUser()

  const menusP = payload.findGlobal({ slug: "menus" }) as Promise<Menu>

  const settingsP = payload.findGlobal({
    slug: "settings",
  }) as Promise<Settings>

  const cartId =
    cartFromCookie ??
    (typeof user?.cart === "object" ? user?.cart?.id : user?.cart)

  let cartP: Promise<Cart | void> = Promise.resolve()

  let cart: Cart | null | undefined =
    typeof user?.cart === "object" ? user?.cart : null

  if (cartId && !cart) {
    try {
      cartP = payload
        .findByID({ collection: "carts", id: cartId })
        .catch((e) => console.warn("Error fetching guest cart."))
    } catch (error) {
      console.warn("No cart found.")
    }
  } else {
    cartP = Promise.resolve()
  }

  const [settings, menus, cartData] = await Promise.all([
    settingsP,
    menusP,
    cartP,
  ])

  return {
    user,
    menus,
    settings,
    cart: cartData ?? cart,
    promo: true,
  }
}

export default getLayoutData

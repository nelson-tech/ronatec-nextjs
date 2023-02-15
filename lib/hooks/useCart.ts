import getClient from "@api/client"
import {
  AddToCartDocument,
  AddToCartMutationVariables,
  Cart,
  ClearCartDocument,
  GetCartDocument,
  RemoveCartItemDocument,
  RemoveCartItemMutationVariables,
  UpdateCartItemQuantityDocument,
  UpdateCartItemQuantityMutationVariables,
} from "@api/codegen/graphql"
import useStore from "./useStore"

const useCart = () => {
  const client = getClient()

  const { state: cart, setCart, setLoading } = useStore(stores => stores.cart)

  const fetchCart = async () => {
    setLoading(true)

    const cartData = await client.request(GetCartDocument)

    cartData.cart && setCart(cartData.cart as Cart)

    setLoading(false)
  }

  const clearCart = async () => {
    setLoading(true)

    const clearCartData = await client.request(ClearCartDocument, { input: {} })

    await fetchCart()

    return clearCartData
  }

  const removeItem = async (input: RemoveCartItemMutationVariables) => {
    setLoading(true)

    const removeItemData = await client.request(RemoveCartItemDocument, input)

    await fetchCart()

    return removeItemData
  }

  const addToCart = async (input: AddToCartMutationVariables) => {
    setLoading(true)

    const cartData = await client.request(AddToCartDocument, input)

    cartData.addToCart?.cart && setCart(cartData.addToCart.cart as Cart)

    setLoading(false)

    return cartData
  }

  const updateCart = async (input: UpdateCartItemQuantityMutationVariables) => {
    setLoading(true)

    const updateCartData = await client.request(
      UpdateCartItemQuantityDocument,
      input,
    )

    await fetchCart()

    return updateCartData
  }

  return { clearCart, removeItem, addToCart, updateCart, fetchCart }
}

export default useCart

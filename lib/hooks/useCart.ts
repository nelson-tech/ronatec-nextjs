import { useCallback } from "react"
import shallow from "zustand/shallow"

import getClient from "@api/client"
import {
  AddToCartDocument,
  ClearCartDocument,
  GetCartDocument,
  RemoveCartItemDocument,
  UpdateCartItemQuantityDocument,
} from "@api/codegen/graphql"
import type {
  AddToCartMutationVariables,
  Cart,
  RemoveCartItemMutationVariables,
  UpdateCartItemQuantityMutationVariables,
} from "@api/codegen/graphql"
import useStore from "./useStore"

const useCart = () => {
  const client = getClient()

  const { setCart, setLoading, setOpen } = useStore(
    (stores) => stores.cart,
    shallow
  )

  const fetchCart = useCallback(async () => {
    setLoading(true)

    const cartData = await client.request(GetCartDocument)

    cartData.cart && setCart(cartData.cart as Cart)

    setLoading(false)
  }, [client, setCart, setLoading])

  const clearCart = async () => {
    setLoading(true)

    const clearCartData = await client.request(ClearCartDocument, { input: {} })

    clearCartData.emptyCart?.cart &&
      setCart(clearCartData.emptyCart.cart as Cart)

    return clearCartData
  }

  const removeItem = async (input: RemoveCartItemMutationVariables) => {
    setLoading(true)

    const removeItemData = await client.request(RemoveCartItemDocument, input)

    removeItemData.removeItemsFromCart?.cart &&
      setCart(removeItemData.removeItemsFromCart.cart as Cart)

    setLoading(false)

    return removeItemData
  }

  const addToCart = async (input: AddToCartMutationVariables) => {
    setLoading(true)

    const cartData = await client.request(AddToCartDocument, input)

    if (cartData.addToCart?.cart) {
      setCart(cartData.addToCart.cart as Cart)
      setOpen(true)
    }

    setLoading(false)

    return cartData
  }

  const updateCart = async (input: UpdateCartItemQuantityMutationVariables) => {
    setLoading(true)

    const updateCartData = await client.request(
      UpdateCartItemQuantityDocument,
      input
    )

    updateCartData.updateItemQuantities?.cart &&
      setCart(updateCartData.updateItemQuantities.cart as Cart)

    setLoading(false)

    return updateCartData
  }

  return { clearCart, removeItem, addToCart, updateCart, fetchCart }
}

export default useCart

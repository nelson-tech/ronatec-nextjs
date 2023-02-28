import { useCallback } from "react"
import { shallow } from "zustand/shallow"

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

    try {
      const cartData = await client.request(GetCartDocument)

      cartData.cart && setCart(cartData.cart as Cart)
    } catch (error) {
      console.warn("Error fetching cart in useCart:", error)
    }

    setLoading(false)
  }, [client, setCart, setLoading])

  const clearCart = useCallback(async () => {
    setLoading(true)

    try {
      const clearCartData = await client.request(ClearCartDocument, {
        input: {},
      })

      clearCartData.emptyCart?.cart &&
        setCart(clearCartData.emptyCart.cart as Cart)
    } catch (error) {
      console.warn("Error clearing cart in useCart:", error)

      fetchCart()
    }

    setLoading(false)
  }, [client, fetchCart, setCart, setLoading])

  const removeItem = useCallback(
    async (input: RemoveCartItemMutationVariables) => {
      setLoading(true)

      try {
        const removeItemData = await client.request(
          RemoveCartItemDocument,
          input
        )

        removeItemData.removeItemsFromCart?.cart &&
          setCart(removeItemData.removeItemsFromCart.cart as Cart)
      } catch (error) {
        console.warn("Error removing item in useCart:", error)
      }

      setLoading(false)
    },
    [client, setCart, setLoading]
  )

  const addToCart = useCallback(
    async (input: AddToCartMutationVariables) => {
      setLoading(true)

      try {
        const cartData = await client.request(AddToCartDocument, input)

        if (cartData.addToCart?.cart) {
          setCart(cartData.addToCart.cart as Cart)
          setOpen(true)
        }
      } catch (error) {
        console.warn("Error adding item in useCart:", error)
      }

      setLoading(false)
    },
    [client, setCart, setOpen, setLoading]
  )

  const updateCart = useCallback(
    async (input: UpdateCartItemQuantityMutationVariables) => {
      setLoading(true)

      try {
        const updateCartData = await client.request(
          UpdateCartItemQuantityDocument,
          input
        )

        updateCartData.updateItemQuantities?.cart &&
          setCart(updateCartData.updateItemQuantities.cart as Cart)
      } catch (error) {
        console.warn("Error updating cart in useCart:", error)
      }

      setLoading(false)
    },
    [client, setCart, setLoading]
  )

  return { clearCart, removeItem, addToCart, updateCart, fetchCart }
}

export default useCart

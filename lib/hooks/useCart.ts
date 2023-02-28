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

  const { loading, setCart, setLoading, setOpen, setAlert } = useStore(
    (stores) => ({
      loading: stores.cart.loading,
      setCart: stores.cart.setCart,
      setLoading: stores.cart.setLoading,
      setOpen: stores.cart.setOpen,
      setAlert: stores.alert.setAlert,
    }),
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
        } else {
          setAlert({
            open: true,
            kind: "error",
            primary: "Error adding to the shopping cart.",
            secondary: "Please try refreshing the page.",
          })
        }
      } catch (error) {
        console.warn("Error adding item in useCart:", error)

        setAlert({
          open: true,
          kind: "error",
          primary: "Error adding to the shopping cart.",
          secondary: "Please try refreshing the page.",
        })
      }

      setLoading(false)
    },
    [client, setAlert, setCart, setOpen, setLoading]
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

  return { loading, clearCart, removeItem, addToCart, updateCart, fetchCart }
}

export default useCart

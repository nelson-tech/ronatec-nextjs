import { useCallback } from "react"

import useStore from "./useStore"
import type { Cart, ProductItems } from "~payload-types"
import mergeCartItems from "./utils/mergeCartItems"

const useCart = () => {
  const { cartState, user } = useStore((stores) => ({
    cartState: stores.cart.state,
    user: stores.auth.user,
  }))

  const { setCart, setLoading, setOpen, setAlert } = useStore((stores) => ({
    setCart: stores.cart.setCart,
    setLoading: stores.cart.setLoading,
    setOpen: stores.cart.setOpen,
    setAlert: stores.alert.setAlert,
  }))

  const fetchCart = useCallback(async () => {
    setLoading(true)

    if (cartState?.id) {
      try {
        const response = await fetch(`/api/carts/${cartState.id}`)

        const cart: Cart = await response.json()

        cart.id && setCart(cart)
      } catch (error) {
        console.warn("Error fetching cart", error)
      }
    }

    setLoading(false)
  }, [setCart, setLoading, cartState?.id])

  const updateCart = useCallback(
    async (cartData: Partial<Cart>) => {
      const response = await fetch(`/api/carts/${cartState?.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      })

      const data: { message: string; doc: Cart } = await response?.json()

      console.log("Updated cart", data)

      data.doc?.id && setCart(data.doc)
    },
    [cartState?.id, setCart]
  )

  const clearCart = useCallback(async () => {
    setLoading(true)

    if (cartState?.id) {
      try {
        await updateCart({ items: [] })
      } catch (error) {
        console.warn("Error clearing cart in useCart:", error)
      }

      setLoading(false)
    } else {
      // TODO: Provide feedback for missing cart ID
    }
  }, [setLoading, updateCart, cartState?.id])

  const removeItem = useCallback(
    async (productID: string) => {
      setLoading(true)

      if (cartState?.id && cartState?.items) {
        const filteredItems = cartState.items
          .filter((item) => {
            return (
              (typeof item.product === "object"
                ? item.product.id
                : item.product) !== productID
            )
          })
          .map(({ product, totals, title, quantity }: ProductItems[0]) => {
            const formattedItem: ProductItems[0] = {
              product: typeof product === "object" ? product.id : product,
              totals,
              title,
              quantity,
            }
            return formattedItem
          }) as ProductItems

        try {
          await updateCart({ items: filteredItems })
        } catch (error) {
          console.warn("Error removing cart item.", error)
        }
      } else {
        // TODO: Provide feedback for missing cart ID or fetch cart from any possible ID (store or cookie)
      }
      setLoading(false)
    },
    [setLoading, cartState?.id, cartState?.items, updateCart]
  )

  const addCartItems = useCallback(
    async (newItems: ProductItems) => {
      setLoading(true)

      const mergedItems = mergeCartItems({
        newItems,
        existingItems: cartState?.items ?? [],
      })

      if (cartState?.id) {
        try {
          await updateCart({ items: mergedItems })
          setOpen(true)
        } catch (error) {
          console.warn("Error adding cart items.", error)
        }
      } else {
        // Create cart
        try {
          const response = await fetch("/api/carts", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: mergedItems, user: user?.id }),
          })

          const data: { message: string; doc: Cart } = await response?.json()

          if (data.doc?.id) {
            // Set Cookie
            !data.doc.user &&
              (await fetch(`/actions/cart/cookie`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: data.doc.id }),
              }))

            setCart(data.doc)
            setOpen(true)
          }
        } catch (error) {
          console.warn("Error creating new cart.", error)
        }
      }
      setLoading(false)
    },
    [
      setCart,
      setLoading,
      setOpen,
      updateCart,
      user?.id,
      cartState?.id,
      cartState?.items,
    ]
  )

  const updateCartItemQuantity = useCallback(
    async (lineItem: ProductItems[0]) => {
      setLoading(true)

      const mergedItems = mergeCartItems({
        newItems: [lineItem],
        existingItems: cartState?.items ?? [],
      })

      console.log("Merged Items", lineItem, mergedItems)

      if (cartState?.id) {
        try {
          await updateCart({ items: mergedItems })
        } catch (error) {
          console.warn("Error updating cart item quantity.", error)
        }
      } else {
        // TODO: Provide feedback for missing cart ID
      }

      setLoading(false)
    },
    [updateCart, setLoading, cartState?.id, cartState?.items]
  )

  return {
    clearCart,
    removeItem,
    addCartItems,
    updateCartItemQuantity,
    fetchCart,
  }
}

export default useCart

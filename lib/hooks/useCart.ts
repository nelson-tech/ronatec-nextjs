import { useCallback } from "react"

import useStore from "./useStore"
import type { Cart, ProductItems } from "payload/generated-types"
import { CreateCartResponseData } from "@pages/api/createCart"

const useCart = () => {
  const { cartState } = useStore((stores) => ({
    cartState: stores.cart.state,
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

  const clearCart = useCallback(async () => {
    setLoading(true)

    if (cartState?.id) {
      try {
        const response = await fetch(`/api/carts/${cartState.id}`, {
          method: "patch",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [],
          }),
        })

        const data: { message: string; doc: Cart } = await response.json()

        data.doc?.id && setCart(data.doc)
      } catch (error) {
        console.warn("Error clearing cart in useCart:", error)

        fetchCart()
      }

      setLoading(false)
    } else {
      // TODO: Provide feedback for missing cart ID
    }
  }, [fetchCart, setCart, setLoading, cartState?.id])

  const updateCart = useCallback(async (cartData: Partial<Cart>) => {
    const response = await fetch(`/actions/cart/${cartState?.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })

    const data: { cart: Cart } = await response?.json()
    console.log("Fetch survived", data)

    data.cart?.id && setCart(data.cart)
  }, [])

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
          .map(({ product, price, title, quantity }: ProductItems[0]) => {
            const formattedItem: ProductItems[0] = {
              product: typeof product === "object" ? product.id : product,
              price,
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
    [setCart, setLoading, cartState?.id]
  )

  const addCartItems = useCallback(
    async (newItems: ProductItems) => {
      setLoading(true)

      console.log("Adding item")

      type MergeCartItemsInputType = {
        newItems: ProductItems
        existingItems: ProductItems
      }

      type MergeCartItemsType = (args: MergeCartItemsInputType) => ProductItems

      const mergeCartItems: MergeCartItemsType = ({
        newItems,
        existingItems,
      }) => {
        let mergedItems = new Map<string, ProductItems[0]>()
        ;[...newItems, ...existingItems].forEach((item) => {
          const productID =
            typeof item.product === "object" ? item.product.id : item.product

          mergedItems.has(productID)
            ? mergedItems.set(productID, {
                ...item,
                product: productID,
                quantity:
                  (mergedItems.get(productID)?.quantity ?? 0) + item.quantity,
              })
            : mergedItems.set(productID, { ...item, product: productID })
        })

        return Array.from(mergedItems.values())
      }

      const mergedItems = mergeCartItems({
        newItems,
        existingItems: cartState?.items ?? [],
      })

      console.log("Merged Items", mergedItems)

      if (cartState?.id) {
        try {
          await updateCart({ items: mergedItems })
        } catch (error) {
          console.warn("Error adding cart items.", error)
        }
      } else {
        // Create cart
        try {
          const newCartResponse = await fetch("/api/createCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: mergedItems }),
          })

          const newCartData =
            (await newCartResponse.json()) as CreateCartResponseData
          if (newCartData?.cart) {
            setCart(newCartData.cart)
          }
        } catch (error) {
          console.warn("Error creating new cart.", error)
        }
      }
      setLoading(false)
    },
    [setCart, setLoading, cartState?.id]
  )

  // const updateCartItemQuantity = useCallback(
  //   async (input: UpdateCartItemQuantityMutationVariables) => {
  //     setLoading(true);

  //     if (cartState?.id) {
  //       try {
  //         const updatedCartData = await client.request(
  //           UpdateCartItemQuantityDocument,
  //           input
  //         );

  //         updatedCartData.updateCartItemQuantity &&
  //           setCart(updatedCartData.updateCartItemQuantity as Cart);
  //       } catch (error) {
  //         console.warn("Error updating cart item quantity.", error);
  //       }
  //     } else {
  //       // TODO: Provide feedback for missing cart ID
  //     }

  //     setLoading(false);
  //   },
  //   [client, setCart, setLoading]
  // );

  return {
    clearCart,
    removeItem,
    addCartItems,
    // updateCartItemQuantity,
    fetchCart,
  }
}

export default useCart

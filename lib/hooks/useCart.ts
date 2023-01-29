import useClient from "@api/client"
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
import { CombinedError, OperationResult } from "urql"
import useStore from "./useStore"

const useCart = () => {
  const client = useClient()

  const { state: cart, setCart, setLoading } = useStore(stores => stores.cart)

  const fetchCart = async () => {
    const cartData = await client.request(GetCartDocument)

    cartData.cart && setCart(cartData.cart as Cart)
  }

  const clearCart = async () => {
    return await client.request(ClearCartDocument, { input: {} })
  }

  const removeItem = async (input: RemoveCartItemMutationVariables) => {
    return await client.request(RemoveCartItemDocument, input)
  }

  const addToCart = async (input: AddToCartMutationVariables) => {
    setLoading(true)
    const cartData = await client.request(AddToCartDocument, input)

    cartData.addToCart?.cart && (await fetchCart())
    setLoading(false)
    return cartData
  }

  const updateCart = async (input: UpdateCartItemQuantityMutationVariables) => {
    return await client.request(UpdateCartItemQuantityDocument, input)
  }

  return { clearCart, removeItem, addToCart, updateCart, fetchCart }
}

export default useCart

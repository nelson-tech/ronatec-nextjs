import {
  AddToCartInput,
  RemoveItemsFromCartInput,
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
} from "@api/gql/types"
import { CombinedError, useClient } from "urql"

const useCart = () => {
  const client = useClient()
  const [cartData] = useGetCartQuery()
  const [_remove, removeMutation] = useRemoveCartItemMutation()
  const [_clear, clearMutation] = useClearCartMutation()
  const [_add, addMutation] = useAddToCartMutation()

  const clearCart = async () => {
    clearMutation({ input: {} }).then(res => {
      const { data, error } = res
      if (data && cartData.operation) {
        client.reexecuteOperation(cartData.operation)
      }
      // TODO - Set errors
    })
  }

  const removeItem = async (input: RemoveItemsFromCartInput) => {
    removeMutation({ input }).then(res => {
      const { data, error } = res
      if (data && cartData.operation) {
        client.reexecuteOperation(cartData.operation)
      }
      // TODO - Set errors
    })
  }

  const addToCart = async (
    input: AddToCartInput,
  ): Promise<{ data: boolean; error: CombinedError | null }> => {
    let returnData: { data: boolean; error: CombinedError | null } = {
      data: false,
      error: null,
    }

    await addMutation({ input }).then(res => {
      const { data, error } = res

      if (data && cartData.operation) {
        client.reexecuteOperation(cartData.operation)
        returnData.data = true
      } else if (error) {
        returnData.error = error
      }
      // TODO - Set errors
    })
    return returnData
  }

  return { clearCart, removeItem, addToCart }
}

export default useCart

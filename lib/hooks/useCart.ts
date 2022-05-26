import {
  AddToCartInput,
  RemoveItemsFromCartInput,
  useAddToCartMutation,
  useClearCartMutation,
  useRemoveCartItemMutation,
} from "@api/gql/types"
import { CombinedError, OperationResult } from "urql"

const useCart = () => {
  const [_remove, removeMutation] = useRemoveCartItemMutation()
  const [_clear, clearMutation] = useClearCartMutation()
  const [_add, addMutation] = useAddToCartMutation()

  const getReturnData = (res: OperationResult) => {
    const { data, error } = res

    let returnData: { data: boolean; error: CombinedError | null } = {
      data: false,
      error: null,
    }

    if (data) {
      returnData.data = true
    } else if (error) {
      returnData.error = error
    }

    return returnData
  }

  const clearCart = async () => {
    return await clearMutation({ input: {} }).then(getReturnData)
  }

  const removeItem = async (input: RemoveItemsFromCartInput) => {
    return await removeMutation({ input }).then(getReturnData)
  }

  const addToCart = async (input: AddToCartInput) => {
    return await addMutation({ input }).then(getReturnData)
  }

  return { clearCart, removeItem, addToCart }
}

export default useCart
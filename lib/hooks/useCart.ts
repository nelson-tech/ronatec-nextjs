import { CombinedError, OperationResult } from "urql"

// import {
//   AddToCartInput,
//   RemoveItemsFromCartInput,
//   UpdateItemQuantitiesInput,
//   useAddToCartMutation,
//   useClearCartMutation,
//   useRemoveCartItemMutation,
//   useUpdateCartItemQuantityMutation,
// } from "@api/codegen/graphql"

const useCart = () => {
  // const [_remove, removeMutation] = useRemoveCartItemMutation()
  // const [_clear, clearMutation] = useClearCartMutation()
  // const [_add, addMutation] = useAddToCartMutation()
  // const [_update, updateMutation] = useUpdateCartItemQuantityMutation()

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
    // return await clearMutation({ input: {} }).then(getReturnData)
  }

  const removeItem = async (input: any) => {
    // return await removeMutation({ input }).then(getReturnData)
  }

  const addToCart = async (input: any) => {
    // return await addMutation({ input }).then(getReturnData)
  }

  const updateCart = async (input: any) => {
    // return await updateMutation({ input }).then(getReturnData)
  }

  return { clearCart, removeItem, addToCart, updateCart }
}

export default useCart

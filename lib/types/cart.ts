import {
  AddToCartMutationVariables,
  Cart,
  RemoveCartItemMutationVariables,
} from "@api/codegen/graphql"

export type EP_Cart_Input_Check_Type = {
  action: "CHECK"
}

export type EP_Cart_Input_AddItem_Type = {
  action: "ADD"
  body: AddToCartMutationVariables
}

export type EP_Cart_Input_RemoveItem_Type = {
  action: "REMOVE"
  body: RemoveCartItemMutationVariables
}

export type EP_Cart_Input_Clear_Type = {
  action: "CLEAR"
}

export type EP_Cart_Input_Type =
  | EP_Cart_Input_Check_Type
  | EP_Cart_Input_AddItem_Type
  | EP_Cart_Input_RemoveItem_Type
  | EP_Cart_Input_Clear_Type

export type EP_Cart_Response_Type = {
  cart: Cart | null
}

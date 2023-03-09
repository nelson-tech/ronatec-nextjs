import { Cart, GetCartQuery, GetViewerQuery } from "@api/codegen/graphql"

export type Layout_AuthData_Type = {
  tokens: CLIENT_Tokens_Type
  newAuth: boolean
  isAuth: boolean
  user: GetViewerQuery["viewer"] | null
  cart?: GetCartQuery["cart"]
}

export type CLIENT_Tokens_Type = {
  auth: string | null | undefined
  refresh: string | null | undefined
  cart: string | null | undefined
  customer: string | null | undefined
}

export type EP_Auth_Input_Set_Type = {
  action: "SET"
  tokens: CLIENT_Tokens_Type
}

export type EP_Auth_Input_Logout_Type = {
  action: "LOGOUT"
}

export type EP_Auth_Input_Type =
  | (EP_Auth_Input_Set_Type | EP_Auth_Input_Logout_Type) & {
      tokens?: CLIENT_Tokens_Type
    }

export type EP_Auth_Response_Type = {
  isAuth: boolean
  needsRefresh?: null | string
  tokens?: CLIENT_Tokens_Type
  cart?: Cart
}

export type EP_Auth_Check_Type = {
  isAuth: boolean
  newCookies: string[]
  tokens: CLIENT_Tokens_Type
}

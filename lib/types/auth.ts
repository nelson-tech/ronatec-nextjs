import { Cart, GetCartQuery, User } from "@api/codegen/graphql"

export type LayoutAuthDataType = {
  tokens: CLIENT_TokensType
  setTokens: [string, string | boolean][]
  isAuth: boolean
  cart?: GetCartQuery["cart"]
}

export type CLIENT_TokensType = {
  auth?: string | null | undefined
  refresh?: string | null | undefined
  user?: string | null | undefined
  cart?: string | null | undefined
  session?: string | null | undefined
  remove?: boolean | null | undefined
}

export type WP_LoginInputType = {
  username: string
  password: string
}

export type ENDPOINT_LoginInputType = {
  action: "LOGIN"

  input?: WP_LoginInputType | null | undefined
}

export type ENDPOINT_LogoutInputType = {
  action: "LOGOUT"
}

export type WP_RegisterInputType = {
  username: string
  name?: string
  first_name?: string
  last_name?: string
  email: string
  url?: string
  description?: string
  locale?: string
  nickname?: string
  slug?: string
  roles?: string
  password: string
  meta?: { [key: string]: string }[]
}

export type ENDPOINT_RegisterInputType = {
  action: "REGISTER"
  input: WP_RegisterInputType
}

export type ENDPOINT_CartInputType = {
  action: "CART"
  cartKey: string | null | undefined
}

export type ENDPOINT_SetInputType = {
  action: "SET"
  tokens: CLIENT_TokensType
}

export type ENDPOINT_AuthInputType =
  | (
      | ENDPOINT_LoginInputType
      | ENDPOINT_LogoutInputType
      | ENDPOINT_RegisterInputType
      | ENDPOINT_CartInputType
      | ENDPOINT_SetInputType
      | {
          action: "CHECKING" | "INIT" | "LOGOUT"
        }
    ) & {
      tokens?: CLIENT_TokensType
    }

export type ENDPOINT_AuthResponseType = {
  isAuth: boolean
  needsRefresh?: null | string
  tokens?: CLIENT_TokensType
  cart?: Cart
  user?: User
}

export type API_AuthCheckResultType = {
  isAuth: boolean
  newCookies: string[]
  user: string | null
  tokens: CLIENT_TokensType
}

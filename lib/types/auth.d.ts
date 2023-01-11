type CLIENT_TokensType = {
  auth?: string | null | undefined
  refresh?: string | null | undefined
  user?: string | null | undefined
  cart?: string | null | undefined
  session?: string | null | undefined
  remove?: boolean | null | undefined
}

type WP_LoginInputType = {
  username: string
  password: string
}

type ENDPOINT_LoginInputType = {
  action: "LOGIN"

  input?: WP_LoginInputType | null | undefined
}

type WP_RegisterInputType = {
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

type ENDPOINT_RegisterInputType = {
  action: "REGISTER"
  input: WP_RegisterInputType
}

type ENDPOINT_CartInputType = {
  action: "CART"
  cartKey: string | null | undefined
}

type ENDPOINT_SetInputType = {
  action: "SET"
  tokens: CLIENT_TokensType
}

type ENDPOINT_AuthInputType =
  | (
      | ENDPOINT_LoginInputType
      | ENDPOINT_RegisterInputType
      | ENDPOINT_CartInputType
      | ENDPOINT_SetInputType
      | {
          action: "CHECKING" | "INIT" | "LOGOUT"
        }
    ) & {
      tokens?: CLIENT_TokensType
    }

type ENDPOINT_AuthResponseType = {
  isAuth: boolean
  needsRefresh?: null | string
  tokens?: CLIENT_TokensType
  cart?: WC_CartType
  user?: CLIENT_UserDataType
}

type API_AuthCheckResultType = {
  isAuth: boolean
  newCookies: string[]
  user: WP_AUTH_UserDataType
  tokens: CLIENT_TokensType
}

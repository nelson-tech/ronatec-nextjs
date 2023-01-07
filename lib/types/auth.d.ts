type InMemoryAuthTokenType = {
  authToken: string | null
  authExpiration: number | null
}

type WP_AuthTokensType = {
  auth?: string | null | undefined
  refresh?: string | null | undefined
  user?: string | null | undefined
  cart?: string | null | undefined
  session?: string | null | undefined
}

type WP_AUTH_LoginInputType = {
  username: string
  password: string
}

type WP_AUTH_LoginType = {
  action: "LOGIN"

  input?: WP_AUTH_LoginInputType | null | undefined
}

type WP_RegisterUserInputType = {
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

type WP_AUTH_RegisterType = {
  action: "REGISTER"
  input: WP_RegisterUserInputType
}

type WP_AUTH_CartType = {
  action: "CART"
  cartKey: string | null | undefined
}

type API_SetInputType = {
  action: "SET"
  newCookies: string
}

type API_AuthInputType =
  | (
      | WP_AUTH_LoginType
      | WP_AUTH_RegisterType
      | WP_AUTH_CartType
      | API_SetInputType
      | {
          action: "CHECKING" | "INIT" | "LOGOUT"
        }
    ) & {
      tokens?: WP_AuthTokensType
    }

type WP_AUTH_LoginResponseType = {
  success: boolean
  statusCode: number
  code: string
  message: string
  data: WP_AUTH_UserDataType & {
    token: string
  }
}

type CLIENT_AuthTokensType = {
  authToken: string
  refreshToken?: string
  cartKey?: string
}

type API_AuthResponseType = {
  isAuth: boolean
  needsRefresh?: null | string
  tokens?: WP_AuthTokensType
  cart?: WC_CartType
  user?: CLIENT_UserDataType
}

type API_AuthCheckResultType = {
  isAuth: boolean
  newCookies: string[]
  user: WP_AUTH_UserDataType
  tokens: WP_AuthTokensType
}

import { GetCartQuery } from "@api/codegen/graphql"

export type LayoutAuthDataType = {
  tokens: CLIENT_TokensType
  setTokens: [string, string | boolean][]
  isAuth: boolean
  cart?: GetCartQuery["cart"]
}

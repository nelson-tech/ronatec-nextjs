import useClient from "@api/client"
import { RefreshAuthTokenDocument } from "@api/codegen/graphql"
import { AUTH_TOKEN_EXPIRATION, AUTH_TOKEN_KEY } from "@lib/constants"
import { CLIENT_Tokens_Type, EP_Auth_Check_Type } from "@lib/types/auth"

const useRefreshToken = async (
  tokens: CLIENT_Tokens_Type,
): Promise<EP_Auth_Check_Type> => {
  const client = useClient(tokens)

  const newCookies: string[] = []

  let isAuth = false

  if (tokens.refresh) {
    const refreshData = await client.request(RefreshAuthTokenDocument, {
      input: { jwtRefreshToken: tokens.refresh },
    })

    if (refreshData.refreshJwtAuthToken?.authToken) {
      const authToken = refreshData.refreshJwtAuthToken.authToken
      newCookies.push(
        `${AUTH_TOKEN_KEY}=${authToken}; HttpOnly; Path=/; SameSite=None; Secure; expires=${new Date(
          Date.now() + AUTH_TOKEN_EXPIRATION,
        ).toUTCString()}`,
      )

      tokens.auth = authToken

      isAuth = true
    }
  }

  return { tokens, newCookies, isAuth }
}

export default useRefreshToken

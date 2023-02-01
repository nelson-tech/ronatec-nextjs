import { GraphQLClient } from "graphql-request"

import { API_URL, AUTH_ENDPOINT, CART_TOKEN_KEY } from "@lib/constants"
import isServer from "@lib/utils/isServer"
import {
  CLIENT_Tokens_Type,
  EP_Auth_Input_Set_Type,
  EP_Auth_Response_Type,
} from "@lib/types/auth"

// ####
// #### Variables
// ####

let graphqlClient: GraphQLClient | null = null

// ####
// #### Middleware
// ####

const requestMiddleware = async (request: any) => {
  // Strip authorization unless required
  const { auth, Authorization, ...headers } = request.headers

  if (auth === "true") {
    // Call requires auth

    if (!isServer) {
      // Make auth call to validate
      const authResponse = await fetch(AUTH_ENDPOINT)
      const authData: EP_Auth_Response_Type = await authResponse.json()

      if (authData.isAuth) {
        headers["Authorization"] = `Bearer ${authData.tokens?.auth}`
      }
    } else {
      headers["Authorization"] = Authorization
    }
  }

  // Server calls rely on cookie
  if (!isServer) {
    // Client calls rely on localStorage
    const clientSession = localStorage.getItem(CART_TOKEN_KEY)
    clientSession &&
      (headers["woocommerce-session"] = `Session ${clientSession}`)
  }

  return { ...request, headers }
}

const responseMiddleware = async (response: any) => {
  const session = response?.headers?.get("woocommerce-session")

  if (!isServer && session) {
    const clientSession = localStorage.getItem(CART_TOKEN_KEY)

    if (session != clientSession) {
      // Make client call to Endpoint to set cookie for frontend
      const body: EP_Auth_Input_Set_Type = {
        action: "SET",
        tokens: {
          cart: session,
        },
      }

      await fetch(AUTH_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(body),
      })

      // Update session on client
      localStorage.setItem(CART_TOKEN_KEY, session)
    }
  }

  if (response.errors) {
    const traceId = response.headers.get("x-b3-traceid") || "unknown"
    console.error(
      `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`,
    )
  }
}

// ####
// #### Hook
// ####

const useClient = (tokens?: CLIENT_Tokens_Type) => {
  if (!graphqlClient) {
    // Create new, unauthenticated client

    graphqlClient = new GraphQLClient(API_URL as string, {
      requestMiddleware,
      responseMiddleware,
    })
  }

  if (tokens) {
    // Set auth headers if present
    const headers: { [key: string]: string } = {}

    tokens?.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)

    if (!isServer) {
      const clientSession = localStorage.getItem(CART_TOKEN_KEY)
      const serverSession = tokens.cart
      const session = clientSession ?? serverSession

      session && (headers["woocommerce-session"] = `Session ${session}`)
    } else {
      tokens?.cart &&
        (headers["woocommerce-session"] = `Session ${tokens.cart}`)
    }

    graphqlClient.setHeaders(headers)
  }

  return graphqlClient
}

export default useClient

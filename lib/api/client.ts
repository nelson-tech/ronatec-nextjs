import { GraphQLClient } from "graphql-request"

import { API_URL, AUTH_ENDPOINT, WOO_SESSION_KEY } from "@lib/constants"
import isServer from "@lib/utils/isServer"
import { CLIENT_TokensType, ENDPOINT_SetInputType } from "@lib/types/auth"

// ####
// #### Variables
// ####

let graphqlClient: GraphQLClient | null = null

// ####
// #### Middleware
// ####

const requestMiddleware = (request: any) => {
  if (!isServer) {
    const clientSession = localStorage.getItem(WOO_SESSION_KEY)
    const headers: any = { ...request.headers }
    clientSession &&
      (headers["woocommerce-session"] = `Session ${clientSession}`)

    return { ...request, headers }
  }
  return request
}

const responseMiddleware = async (response: any) => {
  const session = response?.headers?.get("woocommerce-session")

  if (!isServer && session) {
    const clientSession = localStorage.getItem(WOO_SESSION_KEY)

    if (session != clientSession) {
      // Make client call to API to set cookies for frontend
      const body: ENDPOINT_SetInputType = {
        action: "SET",
        tokens: {
          session,
        },
      }

      await fetch(AUTH_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(body),
      })

      // Update session on client
      localStorage.setItem(WOO_SESSION_KEY, session)
    }
  }

  // if (response.errors) {
  //   const traceId = response.headers.get('x-b3-traceid') || 'unknown'
  //   console.error(
  //     `[${traceId}] Request error:
  //       status ${response.status}
  //       details: ${response.errors}`
  //   )
  // }
}

// ####
// #### Hook
// ####

const useClient = (tokens?: CLIENT_TokensType) => {
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
      const clientSession = localStorage.getItem(WOO_SESSION_KEY)
      const serverSession = tokens.session
      const session = clientSession ?? serverSession

      session && (headers["woocommerce-session"] = `Session ${session}`)
    } else {
      tokens?.session &&
        (headers["woocommerce-session"] = `Session ${tokens.session}`)
    }

    graphqlClient.setHeaders(headers)
  }

  return graphqlClient
}

export default useClient

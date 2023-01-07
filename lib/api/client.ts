import { GraphQLClient } from "graphql-request"

import { API_URL } from "@lib/constants"

let graphqlClient: GraphQLClient | null = null

const useClient = (tokens?: WP_AuthTokensType) => {
  if (tokens) {
    // Create client if tokens passed, even if already exists

    // Set auth headers if present
    const headers: { [key: string]: string } = {}

    tokens?.auth && (headers["Authorization"] = `Bearer ${tokens.auth}`)
    tokens?.session &&
      (headers["woocommerce-session"] = `Session ${tokens.session}`)

    graphqlClient = new GraphQLClient(API_URL as string, { headers })
  } else if (!graphqlClient) {
    // Create new, unauthenticated client

    graphqlClient = new GraphQLClient(API_URL as string)
  }

  return graphqlClient
}

export default useClient

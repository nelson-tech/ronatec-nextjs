import { WOO_SESSION_KEY } from "@lib/constants"
import isServer from "@lib/utils/isServer"

const enhancedFetch: (
  input: RequestInfo,
  init?: RequestInit | undefined,
) => Promise<Response> = (...args) => {
  return fetch(...args).then(response => {
    if (!isServer) {
      // Check for woocommerce-session in response header
      const session = response.headers.get("woocommerce-session")
      const localSession = localStorage.getItem(WOO_SESSION_KEY)

      if (session && localSession !== session) {
        // Store response session if different
        localStorage.setItem(WOO_SESSION_KEY, session)
      }
    }

    return response
  })
}

export default enhancedFetch

import { useEffect, useState } from "react"
import { AppProps } from "next/app"
import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import merge from "deepmerge"
import fetch from "isomorphic-unfetch"
import { IncomingHttpHeaders } from "http2"
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist"
import { useEffectOnce, usePrevious } from "react-use"
import isEqual from "lodash.isequal"

import { cache as defaultCache } from "."
import { isServer } from "@lib/utils"
import { authConstants } from "@lib"

export const PERSISTOR_CACHE_KEY =
  process.env.NEXT_PUBLIC_PERSISTOR_CACHE_KEY || "missing-cache-key"

export const APOLLO_STATE_PROP_NAME =
  process.env.NEXT_PUBLIC_APOLLO_STATE_PROP_NAME || "__APOLLO_STATE__"

const isDev = (): boolean => process.env.NODE_ENV === "development"

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = ({
  headers,
  cache,
}: {
  headers: IncomingHttpHeaders | undefined
  cache: ApolloCache<NormalizedCacheObject> | undefined
}) => {
  // isomorphic fetch for passing the cookies along with each GraphQL request

  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        // here we pass the cookie along for each request
        Cookie: headers?.cookie ?? "",
      },
    }).then(response => response)
  }

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    fetch: enhancedFetch,
  })

  /**
   * Middleware operation
   * Check for expired tokens, set headers.
   */
  const middleware = new ApolloLink((operation, forward) => {
    if (!isServer) {
      const wooSession = localStorage.getItem(authConstants.WOO_SESSION_KEY)
      const rawAuthToken = localStorage.getItem(authConstants.AUTH_TOKEN_KEY)

      if (rawAuthToken || wooSession) {
        const authToken = rawAuthToken && JSON.parse(rawAuthToken || "")

        let headers: {
          authorization?: string
          "woocommerce-session"?: string
        } = {}
        authToken &&
          authToken.authToken &&
          (headers.authorization = `Bearer ${authToken.authToken}`)

        wooSession && (headers["woocommerce-session"] = `Session ${wooSession}`)

        // If session data exist in local storage, set value as session header.
        operation.setContext(({}) => ({
          headers,
        }))
      }

      // console.log("AUTH TOKEN", jwtDecode(authToken))
      // console.log("WOO SESSION", jwtDecode(wooSession))
    }

    return forward(operation)
  })

  /**
   * Afterware operation
   * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
   */
  const afterware = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      /**
       * Check for session header and update session in local storage accordingly.
       */
      if (!isServer) {
        const context = operation.getContext()

        const {
          response: { headers },
        } = context

        const session = headers.get("woocommerce-session")
        const localSession = localStorage.getItem(authConstants.WOO_SESSION_KEY)

        if (session) {
          if (localSession !== session) {
            localStorage.setItem(authConstants.WOO_SESSION_KEY, session)
          }
        }
      }

      return response
    })
  })

  const apolloLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
          locations &&
            locations.map(location => {
              console.log("LOCATION: ", location)
            })
        })
      if (networkError)
        console.log(
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
        )
    }),
    // this uses apollo-link-http under the hood, so all the options here come from that package
    middleware,
    afterware,
    httpLink,
  ])

  return new ApolloClient({
    ssrMode: isServer,
    link: apolloLink,
    cache: cache || defaultCache,
  })
}

interface InitializeApollo {
  headers?: IncomingHttpHeaders
  cache?: ApolloCache<NormalizedCacheObject>
}

export const initializeApollo = ({ headers, cache }: InitializeApollo) => {
  const _apolloClient = apolloClient ?? createApolloClient({ headers, cache })

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

const mergeCache = (
  cache1: NormalizedCacheObject,
  cache2: NormalizedCacheObject,
) => {
  return merge(cache1, cache2, {
    // Combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
    ],
  })
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"],
  existingCache?: NormalizedCacheObject,
) {
  if (pageProps && "props" in pageProps) {
    const props = pageProps.props

    if (existingCache) {
      props[APOLLO_STATE_PROP_NAME] = mergeCache(
        client.cache.extract(),
        existingCache,
      )
    } else {
      props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }
  }

  return pageProps
}

function mergeAndRestoreCache(
  client: ApolloClient<NormalizedCacheObject>,
  state: NormalizedCacheObject | undefined,
) {
  if (!state) return

  // Get existing cache, loaded during client side data fetching
  const existingCache = client.extract()
  // Merge the existing cache into data passed from getStaticProps/getServerSideProps
  const data = mergeCache(state, existingCache)
  // Restore the cache with the merged data
  client.cache.restore(data)
}

export function useApollo(pageProps: Record<string, unknown>): {
  client: ApolloClient<NormalizedCacheObject> | undefined
  cachePersistor: CachePersistor<NormalizedCacheObject> | undefined
} {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as
    | NormalizedCacheObject
    | undefined
  const previousState = usePrevious(state)

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [cachePersistor, setCachePersistor] =
    useState<CachePersistor<NormalizedCacheObject>>()

  useEffectOnce(() => {
    async function init() {
      const cache = defaultCache

      if (!isDev) {
        const cachePersistor = new CachePersistor({
          cache,
          storage: new LocalStorageWrapper(window.localStorage),
          debug: process.env.NODE_ENV === "development",
          key: PERSISTOR_CACHE_KEY,
        })

        // Restore client side persisted data before letting the application to
        // run any queries
        await cachePersistor.restore()
      }

      const client = initializeApollo({ cache })

      if (!isDev) {
        mergeAndRestoreCache(client, state)

        // Trigger persist to persist data from SSR
        if (cachePersistor) {
          cachePersistor.persist()
        }
        setCachePersistor(cachePersistor)
      }

      setClient(client)
    }

    init()
  })

  useEffect(() => {
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here during page transitions
    if (client && state && previousState && !isEqual(state, previousState)) {
      if (!isDev) {
        mergeAndRestoreCache(client, state)

        if (cachePersistor) {
          // Trigger persist to persist data from SSR
          cachePersistor.persist()
        }
      }
    }
  }, [state, previousState, client, cachePersistor])

  return { client, cachePersistor }
}

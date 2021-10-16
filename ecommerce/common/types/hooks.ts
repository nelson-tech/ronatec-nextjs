import { APIFetcher, APIFetcherOptions } from "./api"

export interface APIHooks {
  cart: {
    useAddItem: any
    useCart: any
  }
}

export type MutationHookContext = {
  fetch: (input: any) => any
}

export type FetcherHookContext = {
  input?: any
  fetch: APIFetcher
  options: APIFetcherOptions
}

export type MutationHook = {
  fetcherOptions: APIFetcherOptions
  fetcher: (context: FetcherHookContext) => any
  useHook(context: MutationHookContext): (input: any) => any
}

import { APIFetcher, APIFetcherOptions } from "./api"

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

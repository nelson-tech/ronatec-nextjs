export type Variables = { [key: string]: string | undefined }

export type APIFetcherOptions = {
  url: string
  query: string
  variables?: Variables
}

export type APIFetcherResults<T> = {
  data: T
}

export type APIFetcher<T = any> = (
  options: APIFetcherOptions,
) => Promise<APIFetcherResults<T>>

export interface APIConfig {
  apiUrl: string
  fetch: APIFetcher
}

export interface APIHooks {
  cart: {
    useAddItem: any
  }
}

export interface APIProviderContext {
  hooks: APIHooks
  fetcher: APIFetcher
}

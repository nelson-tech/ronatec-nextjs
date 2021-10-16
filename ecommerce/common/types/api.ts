export type Variables = { [key: string]: string | undefined | any }

export type APIFetcherOptions = {
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
  fetch<T>(options: APIFetcherOptions): Promise<APIFetcherResults<T>>
}

export interface APIHooks {
  cart: {
    useAddItem: any
  }
}

export interface APIProviderContext {
  hooks: APIHooks
  fetcher<T>(options: APIFetcherOptions): Promise<APIFetcherResults<T>>
}

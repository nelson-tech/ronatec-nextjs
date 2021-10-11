export type APIFetcherOptions = {
    url: string
    query: string
}

export type APIFetcherResults<T> = {
    data: T
}

export interface APIConfig {
  apiUrl: string
  fetch<T>(
      options: APIFetcherOptions
  ): Promise<APIFetcherResults<T>>
}
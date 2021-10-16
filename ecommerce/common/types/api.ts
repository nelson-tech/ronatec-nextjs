export type Variables = { [key: string]: string | undefined }

export type APIFetcherOptions = {
  url: string
  query: string
  variables?: Variables
}

export type APIFetcherResults<T> = {
  data: T
}

export interface APIConfig {
  apiUrl: string
  fetch<T>(options: APIFetcherOptions): Promise<APIFetcherResults<T>>
}

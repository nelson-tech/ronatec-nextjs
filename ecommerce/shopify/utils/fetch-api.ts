import { APIFetcherOptions, APIFetcherResults } from "@common/types/api"
import { API_URL, SHOPIFY_ACCESS_TOKEN } from "@ecommerce/const"

const fetchAPI = async <T>({
  query,
  variables,
}: APIFetcherOptions): Promise<APIFetcherResults<T>> => {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message ?? errors.message)
  }

  return { data }
}

export default fetchAPI

import { APIFetcherOptions, APIFetcherResults } from "@common/types/api"

const fetchAPI = async <T>({
  url,
  query,
  variables,
}: APIFetcherOptions): Promise<APIFetcherResults<T>> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

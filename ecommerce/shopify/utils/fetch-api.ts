type FetchAPIParams = {
    query: string
}

type FetchAPIResult<T> = { data: T }


const fetchAPI = async <T>({
  query}: FetchAPIParams
): Promise<FetchAPIResult<T>> => {
  const shopifyDevURL = "https://shopify.dev/graphiql/storefront-graphiql"

  const localDevURL = "http://localhost:4000/graphql"

  const res = await fetch(localDevURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          query
      })
  })

  const { data, errors } = await res.json()

  if (errors) {
      throw new Error(errors[0].message ?? errors.message)
  }

  return { data }
}

export default fetchAPI
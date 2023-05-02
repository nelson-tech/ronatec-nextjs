import { API_URL } from "@lib/constants"

type DynamicReturnType<T> = {
  data: T | null
}

const getCachedQuery = async <T extends unknown>(
  queryId: string
): Promise<DynamicReturnType<T>> => {
  try {
    const cachedResponse = await fetch(API_URL + `?queryId=${queryId}`, {
      headers: { "content-type": "application/json" },
      next: { revalidate: 60 },
    })

    const { data } = await cachedResponse.json()

    return { data }
  } catch (error) {
    console.warn("Error in GetCachedQuery", error, queryId)
    return { data: null }
  }
}

export default getCachedQuery

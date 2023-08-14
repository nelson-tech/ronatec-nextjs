"use client"

import { useState } from "react"
import debounce from "lodash.debounce"
import qs from "qs"
import type { Product } from "payload/generated-types"

const useSearch = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Product[] | undefined>()

  const fetchSearchResults = async (search: string) => {
    setLoading(true)
    const query = qs.stringify(
      { where: { title: { like: search } } },
      { addQueryPrefix: true }
    )
    const response = await fetch(`/api/products${query}`)

    const productsData: { errors: string[]; docs: Product[] } =
      await response.json()
    productsData.docs && setResults(productsData.docs)
    setLoading(false)
  }

  const getSearchResults = debounce(fetchSearchResults, 500)

  return { results, loading, getSearchResults }
}

export default useSearch

"use client"

import { useState } from "react"
import debounce from "lodash.debounce"

import useClient from "@api/client"
import { Product, QuickSearchDocument } from "@api/codegen/graphql"

const useSearch = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Product[] | undefined>()

  const client = useClient()

  const fetchSearchResults = async (search: string) => {
    setLoading(true)
    const data = await client.request(QuickSearchDocument, { search })
    data.products?.nodes && setResults(data.products.nodes as Product[])
    setLoading(false)
  }

  const getSearchResults = debounce(fetchSearchResults, 500)

  return { results, loading, getSearchResults }
}

export default useSearch

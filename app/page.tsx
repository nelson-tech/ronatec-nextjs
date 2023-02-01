import { Product, ProductCategory } from "@api/codegen/graphql"
import Home from "@components/Pages/Home"
import { API_URL } from "@lib/constants"

const getHomeData = async () => {
  // Get persisted query for speed
  const response = await fetch(API_URL + "?queryId=getHomeData", {
    headers: { "content-type": "application/json" },
  })

  const { data } = await response.json()

  return {
    page: data?.page,
    categories: data?.productCategories?.nodes as
      | ProductCategory[]
      | null
      | undefined,
    topSellers: data.products?.nodes as Product[] | null | undefined,
  }
}

const HomePage = async () => {
  const data = await getHomeData()
  const { page: home, topSellers, categories } = data
  return (
    <>
      <Home home={home} topSellers={topSellers} categories={categories} />
    </>
  )
}

export default HomePage

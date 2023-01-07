import useClient from "@api/client"
import {
  GetHomeDataDocument,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"
import Home from "@components/Pages/Home"

const getHomeData = async () => {
  const client = useClient()

  const data = await client.request(GetHomeDataDocument)

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

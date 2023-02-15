import getHomeData from "@lib/server/getHomeData"

import Home from "@components/Pages/Home"
import parseMetaData from "@lib/utils/parseMetaData"
import { RankMathPostTypeSeo } from "@api/codegen/graphql"

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

export const revalidate = 60 // revalidate this page every 60 seconds

// @ts-ignore
export async function generateMetadata({ params }: ProductPageParamsType) {
  const { page } = await getHomeData()

  const metaData = parseMetaData({
    ...page?.seo,
    title: null,
  } as RankMathPostTypeSeo)

  return metaData
}

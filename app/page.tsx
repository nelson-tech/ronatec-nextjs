import getHomeData from "@lib/server/getHomeData"

import Home from "@components/Pages/Home"
import parseMetaData from "@lib/utils/parseMetaData"
import { RankMathPostTypeSeo } from "@api/codegen/graphql"

const HomePage = async () => {
  const data = await getHomeData()

  const home = data?.page
  const categories = data?.categories
  const topSellers = data?.topSellers

  return (
    <>
      <Home home={home} topSellers={topSellers} categories={categories} />
    </>
  )
}

export default HomePage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata() {
  const data = await getHomeData()

  const metaData = parseMetaData({
    ...data?.page?.seo,
    title: null,
  } as RankMathPostTypeSeo)

  return metaData
}

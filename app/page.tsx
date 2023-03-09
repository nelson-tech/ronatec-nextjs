import { Metadata } from "next/types"

import { RankMathPostTypeSeo } from "@api/codegen/graphql"
import getHomeData from "@lib/server/getHomeData"
import parseMetaData from "@lib/utils/parseMetaData"

import Home from "@components/Pages/Home"

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

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData()

  const metaData = parseMetaData({
    ...data?.page?.seo,
    title: "Ronatec C2C, Inc.",
  } as RankMathPostTypeSeo)

  return metaData
}

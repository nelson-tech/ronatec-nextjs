import type { Metadata } from "next/types"

import getHomeData from "@server/load/getHomeData"
import parseMetaData from "@utils/parseMetaData"

import Home from "@components/Pages/Home"

const HomePage = async () => {
  const data = await getHomeData()

  const home = data?.home
  const topSellers = data?.topSellers

  return (
    <>
      <Home home={home} topSellers={topSellers} />
    </>
  )
}

export default HomePage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData()

  const metaData = parseMetaData({
    ...data?.home.meta,
    title: "Ronatec C2C, Inc.",
  })

  return metaData
}

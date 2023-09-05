import getPayloadClient from "~payload/payloadClient"
import { Home } from "~payload/payload-types"
import productWhere from "@server/utils/productWhere"

const getHomeData = async () => {
  const payload = await getPayloadClient()
  try {
    const topSellersData = await payload.find({
      collection: "products",
      limit: 8,
      sort: "-updatedAt",
      where: productWhere(),
    })

    const home = (await payload.findGlobal({ slug: "home" })) as Home

    return {
      topSellers: topSellersData.docs,
      home,
    }
  } catch (error) {
    console.warn("Error in getHomeData:", error)

    return null
  }
}

export default getHomeData

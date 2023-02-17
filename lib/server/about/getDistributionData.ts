import getClient from "@api/client"
import { GetDistributionDataDocument } from "@api/codegen/graphql"
import type { Supplier } from "@api/codegen/graphql"

const getDistributionData = async () => {
  try {
    const client = getClient()

    const distributionData = await client.request(GetDistributionDataDocument)

    return distributionData.suppliers?.nodes as Supplier[] | null | undefined
  } catch (error) {
    console.warn("Error in getDistributionData:", error)

    return null
  }
}

export default getDistributionData

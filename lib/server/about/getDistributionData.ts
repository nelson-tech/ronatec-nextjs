import type { GetDistributionDataQuery, Supplier } from "@api/codegen/graphql"
import getCachedQuery from "../getCachedQuery"

const getDistributionData = async () => {
  try {
    const { data } = await getCachedQuery<GetDistributionDataQuery>(
      "getDistributionData"
    )

    return data?.suppliers?.nodes as Supplier[] | null | undefined
  } catch (error) {
    console.warn("Error in getDistributionData:", error)

    return null
  }
}

export default getDistributionData

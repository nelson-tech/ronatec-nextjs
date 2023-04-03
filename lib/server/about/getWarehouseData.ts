import type { GetWarehousesDataQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "../getCachedQuery"

const getWarehousesData = async () => {
  try {
    const { data } = await getCachedQuery<GetWarehousesDataQuery>(
      "getWarehousesData"
    )

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getWarehousesData:", error)

    return null
  }
}

export default getWarehousesData

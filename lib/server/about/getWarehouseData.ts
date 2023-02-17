import getClient from "@api/client"
import { GetWarehousesDataDocument } from "@api/codegen/graphql"
import type { Page } from "@api/codegen/graphql"

const getWarehousesData = async () => {
  try {
    const client = getClient()

    const warehousesData = await client.request(GetWarehousesDataDocument)

    return warehousesData.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getWarehousesData:", error)

    return null
  }
}

export default getWarehousesData

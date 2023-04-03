import type { GetConsultingDataQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "./getCachedQuery"

const getConsultingData = async () => {
  try {
    const { data } = await getCachedQuery<GetConsultingDataQuery>(
      "getConsultingData"
    )

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getConsultingData", error)

    return null
  }
}

export default getConsultingData

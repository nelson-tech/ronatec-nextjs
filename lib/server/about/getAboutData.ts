import type { GetAboutDataQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "../getCachedQuery"

const getAboutData = async () => {
  try {
    const { data } = await getCachedQuery<GetAboutDataQuery>("getAboutData")

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getAboutData:", error)

    return null
  }
}

export default getAboutData

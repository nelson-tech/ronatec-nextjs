import type { GetContactDataQuery, Page } from "@api/codegen/graphql"
import getCachedQuery from "../getCachedQuery"

const getContactData = async () => {
  try {
    const { data } = await getCachedQuery<GetContactDataQuery>("getContactData")

    return data?.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getContactData:", error)

    return null
  }
}

export default getContactData

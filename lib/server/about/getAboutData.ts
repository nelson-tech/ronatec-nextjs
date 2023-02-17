import getClient from "@api/client"
import { GetAboutDataDocument } from "@api/codegen/graphql"
import type { Page } from "@api/codegen/graphql"

const getAboutData = async () => {
  try {
    const client = getClient()

    const aboutData = await client.request(GetAboutDataDocument)

    return aboutData.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getAboutData:", error)

    return null
  }
}

export default getAboutData

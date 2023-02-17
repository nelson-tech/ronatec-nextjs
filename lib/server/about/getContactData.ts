import getClient from "@api/client"
import { GetContactDataDocument } from "@api/codegen/graphql"
import type { Page } from "@api/codegen/graphql"

const getContactData = async () => {
  try {
    const client = getClient()

    const data = await client.request(GetContactDataDocument)

    return data.page as Page | null | undefined
  } catch (error) {
    console.warn("Error in getContactData:", error)

    return null
  }
}

export default getContactData

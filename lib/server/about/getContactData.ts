import type { GetContactDataQuery } from "@api/codegen/graphql"
import getCachedQuery from "../getCachedQuery"

const getContactData = async () => {
  const { data } = await getCachedQuery<GetContactDataQuery>("getContactData")

  return data?.page
}

export default getContactData

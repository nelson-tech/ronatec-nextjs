import getClient from "@api/client"
import { GetCustomerDataDocument } from "@api/codegen/graphql"
import type { Customer } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getCustomerData = async () => {
  try {
    const { tokens } = await getTokensServer()

    const client = getClient(tokens)

    const customerData = await client.request(GetCustomerDataDocument)

    return customerData.customer as Customer | null | undefined
  } catch (error) {
    console.warn("Error in getCustomerData:", error)

    return null
  }
}

export default getCustomerData

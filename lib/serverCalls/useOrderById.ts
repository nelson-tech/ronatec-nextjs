import useClient from "@api/client"
import { GetOrderDataByIdDocument } from "@api/codegen/graphql"
import getTokens from "@lib/utils/getTokens"

const useOrderById = async (number: string | undefined) => {
  const { tokens } = await getTokens()

  const client = useClient(tokens)

  client.setHeader("auth", "true")
  const orderData = await client.request(GetOrderDataByIdDocument, {
    id: number,
  })
  client.setHeader("auth", "false")

  return orderData.order
}

export default useOrderById

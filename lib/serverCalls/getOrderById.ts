import useClient from "@api/client"
import { GetOrderDataByIdDocument, Order } from "@api/codegen/graphql"
import getTokens from "@lib/utils/getTokens"

const getOrderById = async (number: string | undefined) => {
  const { tokens } = getTokens()

  const client = useClient(tokens)

  const orderData = await client.request(GetOrderDataByIdDocument, {
    id: number,
  })

  return orderData.order
}

export default getOrderById

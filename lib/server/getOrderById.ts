import getClient from "@api/client"
import { GetOrderDataByIdDocument, Order } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

const getOrderById = async (number: string | undefined) => {
  const { tokens } = await getTokensServer()

  const client = getClient(tokens)

  const orderData = await client.request(GetOrderDataByIdDocument, {
    id: number,
  })

  return orderData.order as Order
}

export default getOrderById

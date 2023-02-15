import getClient from "@api/client"
import { Customer, GetCustomerDataDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import Checkout from "@components/Checkout"

// ####
// #### Server Calls
// ####

const getCustomerData = async () => {
  const { tokens } = await getTokensServer()

  const client = getClient(tokens)

  const customerData = await client.request(GetCustomerDataDocument)

  console.log("CustomerData", tokens, customerData)

  return customerData.customer as Customer
}

// ####
// #### Component
// ####

const CheckoutPage = async () => {
  const customer = await getCustomerData()

  return (
    <>
      <Checkout hidePrices customer={customer} />
    </>
  )
}

export default CheckoutPage

import useClient from "@api/client"
import { Customer, GetCustomerDataDocument } from "@api/codegen/graphql"

import Checkout from "@components/Checkout"
import getTokens from "@lib/utils/getTokens"

// ####
// #### Server Calls
// ####

const getCustomerData = async () => {
  const { tokens } = await getTokens()

  const client = useClient(tokens)

  const customerData = await client.request(GetCustomerDataDocument)

  console.log("CustomerData", tokens, customerData)

  return customerData.customer
}

// ####
// #### Component
// ####

const CheckoutPage = async () => {
  const customer = await getCustomerData()

  return (
    <>
      <Checkout hidePrices customer={customer as Customer} />
    </>
  )
}

export default CheckoutPage

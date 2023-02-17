import getCustomerData from "@lib/server/getCustomerData"

import Checkout from "@components/Checkout"

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

export const revalidate = 0 // dynamically serve this page

export const metadata = {
  title: "Checkout - Ronatec",
  description: "Checkout to complete your order!",
  keywords: ["Checkout", "Shop", "Ronatec", "Metal Finishing"],
}

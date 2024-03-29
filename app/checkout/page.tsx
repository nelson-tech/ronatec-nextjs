import getCustomerData from "@lib/server/getCustomerData"

import Checkout from "@components/Checkout"

// ####
// #### Component
// ####

const CheckoutPage = async () => {
  const customer = await getCustomerData()

  return (
    <>
      <Checkout customer={customer} />
    </>
  )
}

export default CheckoutPage

export const revalidate = 0 // dynamically serve this page

export const metadata = {
  title: "Checkout",
  description: "Checkout to complete your order!",
  keywords: ["Checkout", "Shop", "Ronatec", "Metal Finishing"],
}

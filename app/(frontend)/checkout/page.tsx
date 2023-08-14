import Checkout from "./Checkout"

// ####
// #### Component
// ####

const CheckoutPage = async () => {
  return (
    <>
      <Checkout />
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

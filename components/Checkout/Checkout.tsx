import { Customer, useGetCustomerDataQuery } from "@api/codegen/graphql"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import useStore from "@lib/hooks/useStore"
import CartSummary from "./CartSummary"
import CheckoutForm from "./CheckoutForm"
import DiscountForm from "./DiscountForm"
import MobileSummary from "./MobileSummary"
import PricingSummary from "./PricingSummary"

// ####
// #### Types
// ####

type PropsType = {
  hidePrices?: boolean
  discounts?: boolean
}

// ####
// #### Component
// ####

const Checkout = ({ hidePrices, discounts }: PropsType) => {
  const loggedIn = useStore(state => state.auth.loggedIn)
  const [{ data }] = useGetCustomerDataQuery({ requestPolicy: "network-only" })

  return (
    <>
      <main className="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse max-w-7xl mx-auto">
        <h1 className="sr-only">Checkout</h1>

        <MobileSummary hidePrices={hidePrices} />

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto overflow-y-auto divide-y divide-gray-200 px-6"
          >
            <CartSummary hidePrices={hidePrices} />
          </ul>

          {!hidePrices && (
            <div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
              {discounts && <DiscountForm />}

              <PricingSummary />
            </div>
          )}
        </section>

        {data?.customer?.id &&
        ((loggedIn && data.customer.id !== "guest") ||
          (!loggedIn && data.customer.id === "guest")) ? (
          <CheckoutForm customer={data.customer as Customer} />
        ) : (
          <>
            <div className="h-screen mt-48 mx-auto">
              <LoadingSpinner size={12} opacity={50} className="mx-auto" />
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default Checkout

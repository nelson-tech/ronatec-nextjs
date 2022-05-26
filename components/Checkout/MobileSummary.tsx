import { Disclosure } from "@headlessui/react"

import useStore from "@lib/hooks/useStore"

import CartSummary from "./CartSummary"
import DiscountForm from "./DiscountForm"
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

const MobileSummary = ({ hidePrices, discounts }: PropsType) => {
  const cart = useStore(state => state.cart.state)

  return (
    <>
      <section
        aria-labelledby="order-heading"
        className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
      >
        <Disclosure as="div" defaultOpen className="max-w-lg mx-auto">
          {({ open }) => (
            <>
              <div className="flex items-center justify-between">
                <h2
                  id="order-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Your Order
                </h2>
                <Disclosure.Button className="font-medium text-blue-main hover:text-green-main">
                  {open ? (
                    <span>Hide full summary</span>
                  ) : (
                    <span>Show full summary</span>
                  )}
                </Disclosure.Button>
              </div>

              <Disclosure.Panel>
                <ul role="list" className="divide-y divide-gray-200">
                  <CartSummary hidePrices={hidePrices} />
                </ul>

                {!hidePrices && (
                  <div className="border-t border-gray-200">
                    {discounts && <DiscountForm className="mt-10" />}

                    <PricingSummary mobile />
                  </div>
                )}
              </Disclosure.Panel>

              {!hidePrices && (
                <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                  <span className="text-base">Total</span>
                  <span className="text-base">{cart?.total}</span>
                </p>
              )}
            </>
          )}
        </Disclosure>
      </section>
    </>
  )
}

export default MobileSummary

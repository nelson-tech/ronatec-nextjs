"use client"

import { Fragment } from "react"
import { shallow } from "zustand/shallow"

import { Customer } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import CartSummary from "./CartSummary"
import CheckoutForm from "./CheckoutForm"
import GuestCheckoutWarning from "./GuestCheckoutWarning"
import MobileSummary from "./MobileSummary"

// ####
// #### Types
// ####

type PropsType = {
  customer: Customer | null | undefined
}

// ####
// #### Component
// ####

const Checkout = ({ customer }: PropsType) => {
  const cart = useStore((state) => state.cart.state)
  const { loggedIn, authReady } = useStore(
    (state) => ({
      loggedIn: state.auth.loggedIn,
      authReady: state.auth.ready,
    }),
    shallow
  )

  const emptyCart = cart?.isEmpty
  const loaded = typeof emptyCart === "boolean"

  return (
    <Fragment>
      {loaded ? (
        emptyCart ? (
          <div className="max-w-max mx-auto min-h-full py-24">
            <div className="sm:ml-6">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Cart is empty.
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please add some items to your cart before checking out.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-main hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View products
                </Link>
                {/* <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact support
                </a> */}
              </div>
            </div>
          </div>
        ) : (
          <>
            {!loggedIn && authReady && <GuestCheckoutWarning />}
            <main className="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse max-w-7xl mx-auto">
              <h1 className="sr-only">Checkout</h1>

              <MobileSummary />

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
                  <CartSummary />
                </ul>
              </section>

              {customer?.id ? (
                <div>
                  {!loggedIn && <GuestCheckoutWarning />}
                  <CheckoutForm customer={customer as Customer} />
                </div>
              ) : (
                <>
                  <div className="h-screen mt-48 mx-auto">
                    <LoadingSpinner
                      size={12}
                      opacity={50}
                      className="mx-auto"
                    />
                  </div>
                </>
              )}
            </main>
          </>
        )
      ) : (
        <LoadingSpinner
          size={32}
          opacity={50}
          className="flex mx-auto min-h-screen -mt-24"
        />
      )}
    </Fragment>
  )
}

export default Checkout

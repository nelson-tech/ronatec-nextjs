import dynamic from "next/dist/shared/lib/dynamic"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import PageTitle from "@components/PageTitle"
import Link from "@components/Link"

// ####
// #### Dynamic Imports
// ####

const Checkout = dynamic(() => import("@components/Checkout"), {
  ssr: false,
  loading: () => (
    <LoadingSpinner
      size={32}
      opacity={50}
      className="flex mx-auto min-h-screen -mt-24"
    />
  ),
})

const GuestCheckoutWarning = dynamic(
  () => import("@components/Checkout/GuestCheckoutWarning"),
  {
    ssr: false,
  },
)

// ####
// #### Component
// ####

const CheckoutPage = ({}) => {
  const cart = useStore(state => state.cart.state)
  const { loggedIn, authReady } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      authReady: state.auth.ready,
    }),
    shallow,
  )

  const emptyCart = cart?.isEmpty
  const loaded = typeof emptyCart === "boolean"

  return (
    <>
      <Layout>
        <PageTitle
          title={
            !loaded ? "Checkout" : loggedIn ? "Checkout" : "Guest Checkout"
          }
          description="Cart checkout."
          banner={!emptyCart}
        />

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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View products
                  </Link>
                  {/* <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact support
                </a> */}
                </div>
              </div>
            </div>
          ) : (
            <>
              {!loggedIn && authReady && <GuestCheckoutWarning />}
              <Checkout hidePrices />
            </>
          )
        ) : (
          <LoadingSpinner
            size={32}
            opacity={50}
            className="flex mx-auto min-h-screen -mt-24"
          />
        )}
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(CheckoutPage)

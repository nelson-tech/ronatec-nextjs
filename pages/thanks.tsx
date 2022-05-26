import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"

import useStore from "@lib/hooks/useStore"
import withUrql from "@api/urql/hoc"
import { Order, useGetUserOrderDataQuery } from "@api/gql/types"

import Layout from "@components/ui/Layout"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import PageTitle from "@components/PageTitle"
import OrderConfirmation from "@components/OrderConfirmation"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const Link = dynamic(() => import("@components/Link"), clientOpts)

// ####
// #### Component
// ####

// TODO - Fix error/missing display order

const Thanks = ({}) => {
  const router = useRouter()

  const loggedIn = useStore(state => state.auth.loggedIn)

  const order =
    typeof router.query.orderData === "string"
      ? (JSON.parse(router.query.orderData) as Order)
      : null

  const orderNumber = order // If order passed from checkout, set null
    ? null
    : typeof router.query.order === "string" // Else, if order number given in URL, set orderNumber
    ? router.query.order
    : null

  const [{ data: orderData, error: orderError, fetching: orderLoading }] =
    useGetUserOrderDataQuery({
      variables: { id: orderNumber },
      requestPolicy: "network-only",
      pause: !orderNumber,
    })

  return (
    <>
      <Layout>
        <PageTitle
          title="Thank you!"
          description="Landing page for recently completed orders."
          banner={false}
        />

        <div className="max-w-7xl mx-auto">
          <div className="py-8 px-6 w-full h-full">
            {orderData?.order ? (
              <OrderConfirmation order={orderData?.order as Order} />
            ) : order ? (
              <OrderConfirmation order={order} />
            ) : !router.isReady || orderLoading ? (
              <>
                <div className="mx-auto">
                  <p className="text-center mt-8">Fetching order details...</p>
                  <LoadingSpinner
                    size={24}
                    opacity={50}
                    className="m-auto flex mt-16"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-400 text-center">
                    <p>Oops, no order found...</p>
                    <p>
                      Please contact us if you think there&apos;s been a
                      mistake.
                    </p>
                  </h2>
                </div>
                {loggedIn && (
                  <div className="mt-8 text-center text-gray-500">
                    <p>
                      You can view your previous orders from the{" "}
                      <Link
                        href="/dashboard/orders"
                        className="text-blue-main hover:text-green-main transition underline"
                      >
                        dashboard
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Thanks)

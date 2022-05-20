import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"
import CheckIcon from "@heroicons/react/solid/CheckIcon"

import withUrql from "@api/urql/hoc"
import { Order, useGetUserOrderDataQuery } from "@api/gql/types"

import Layout from "@components/ui/Layout"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const Link = dynamic(() => import("@components/Link"), clientOpts)
const OrderDetails = dynamic(
  () => import("@components/Orders/Details"),
  clientOpts,
)

// ####
// #### Component
// ####

const Thanks = ({}) => {
  const router = useRouter()

  const [{ data: orderData, error: orderError, fetching: orderLoading }] =
    useGetUserOrderDataQuery({
      variables: { id: router.query.order as string },
      requestPolicy: "network-only",
    })

  const orderNumber = router.query.order

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
            {!orderError ? (
              !orderNumber || orderLoading ? (
                <>
                  <div className="mx-auto">
                    <p className="text-center mt-8">
                      Fetching order details...
                    </p>
                    <LoadingSpinner
                      size={24}
                      opacity={50}
                      className="m-auto flex mt-16"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-extrabold text-gray-800 text-center">
                    Thank you!
                  </h2>
                  <div className="flex items-center rounded bg-green-100 shadow w-fit p-2 mt-4 mx-auto">
                    <CheckIcon className="h-8 w-8 text-green-main mr-2" />
                    <p className="text-gray-600">
                      Order #{orderNumber} has been placed.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    {orderData?.order ? (
                      <OrderDetails order={orderData.order as Order} />
                    ) : (
                      <div className="px-6 text-gray-500">
                        <div className="pb-4">
                          Order details are only visible on our website for
                          orders placed with a user account. Please{" "}
                          <span className="font-bold">
                            save your order number
                          </span>{" "}
                          ( #{orderNumber} ) for future reference.
                        </div>
                        <div>
                          A sales representative will contact you to finish
                          processing your order. If you have any questions,
                          please{" "}
                          <Link
                            href="/about/contact"
                            className="underline text-blue-main hover:text-green-main"
                          >
                            contact us
                          </Link>{" "}
                          with your order number ( #{orderNumber} ).
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <>
                <h2 className="text-xl font-extrabold text-gray-400 text-center">
                  <p>Oops, no order found...</p>
                  <p>
                    Please contact us if you think there&apos;s been a mistake.
                  </p>
                </h2>
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

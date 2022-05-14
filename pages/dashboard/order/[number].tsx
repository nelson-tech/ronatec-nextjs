import { useEffect, useState } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"
import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"

import withUrql from "@api/urql/hoc"
import { Order, useGetUserOrderDataQuery } from "@api/gql/types"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import Link from "@components/Link"

// ####
// #### Dynamic Imports
// ####

const importOpts = { ssr: false }

const OrderDetails = dynamic(
  () => import("@components/Orders/Details"),
  importOpts,
)

// ####
// #### Component
// ####

// TODO - Handle errors and auth

const OrderDetailsPage = ({}) => {
  const router = useRouter()

  const [order, setOrder] = useState<Order | undefined>()

  const [{ data: orderData, error: orderError, fetching: orderLoading }] =
    useGetUserOrderDataQuery({
      variables: { id: router.query.number as string },
      pause: !router.query.number,
      requestPolicy: "network-only",
    })

  useEffect(() => {
    if (orderData) {
      orderData?.order && setOrder(orderData.order as Order)
    }
  }, [orderData])

  return (
    <>
      <Layout>
        <PageTitle
          title={"Order #" + router.query.number}
          description="Order details."
          banner={false}
        />

        <div className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
          <div className="max-w-xl">
            <div className="w-full relative flex items-center">
              <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order Details
              </h1>
              <h2 className="sr-only">Refresh orders</h2>
              <Link
                className="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
                title="Return to orders"
                href="/dashboard/orders"
              >
                <h2 className="sr-only">Return to orders</h2>
                <ArrowLeftIcon className={"h-6 w-6"} />
              </Link>
              {orderLoading && (
                <div className="flip ml-4">
                  <RefreshIcon
                    className="h-6 w-6 animate-reverse-spin text-green-main
                    "
                  />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          {order && (
            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>

              <div className="space-y-8">
                <OrderDetails order={order} />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(OrderDetailsPage)

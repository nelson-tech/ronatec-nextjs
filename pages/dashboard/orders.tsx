import { useEffect, useState } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import isEqual from "lodash.isequal"

import { Order, useGetUserOrdersDataQuery } from "@api/gql/types"

import PageTitle from "@components/PageTitle"
import Layout from "@components/ui/Layout"
import withUrql from "@api/urql/hoc"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Dynamic Imports
// ####

const clientOpts = {}

const OrderSummary = dynamic(
  () => import("@components/Orders/Summary"),
  clientOpts,
)

// ####
// #### Component
// ####

// TODO - Handle errors and auth

const Orders = ({}) => {
  const [orders, setOrders] = useState<Order[] | undefined>()

  const [{ data: ordersData, error: ordersError, fetching: ordersLoading }] =
    useGetUserOrdersDataQuery({ requestPolicy: "network-only" })

  useEffect(() => {
    const newOrders = ordersData?.orders?.nodes
      ? ordersData.orders.nodes
      : undefined

    if (newOrders && !isEqual(newOrders, orders)) {
      setOrders(newOrders as Order[])
    }
  }, [orders, ordersData])

  return (
    <>
      <Layout>
        <PageTitle
          title="Orders"
          description="List of orders placed."
          banner={false}
        />

        <div className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
          <div className="max-w-xl">
            <div className="w-full relative flex items-center">
              <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order History
              </h1>
              {(ordersLoading || !orders) && (
                <div
                  className="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
                  title="Refresh orders"
                >
                  <h2 className="sr-only">Refresh orders</h2>
                  <LoadingSpinner size={6} opacity={100} />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          {orders && (
            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>

              <div className="space-y-8">
                {orders.map(order => {
                  if (order.orderNumber) {
                    return (
                      <div key={order.orderNumber}>
                        <OrderSummary order={order} detailsLink />
                      </div>
                    )
                  }
                })}
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

export default withUrql(Orders)

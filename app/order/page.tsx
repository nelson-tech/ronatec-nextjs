import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon"

import { Order } from "@api/codegen/graphql"
import getOrderById from "@lib/serverCalls/getOrderById"

import Link from "@components/Link"
import OrderDetails from "@components/Orders/Details"

// ####
// #### Component
// ####

const OrderPage = async ({
  searchParams,
}: {
  searchParams?: { number: string }
}) => {
  const order = await getOrderById(searchParams?.number)
  return (
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
            <OrderDetails order={order as Order} />
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderPage

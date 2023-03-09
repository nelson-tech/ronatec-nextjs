import { LineItem, Order } from "@api/codegen/graphql"

import Link from "@components/Link"

// ####
// #### Types
// ####

type PropsType = {
  order: Order
  detailsLink?: boolean
}

// ####
// #### Component
// ####

const OrderSummary = ({ order, detailsLink }: PropsType) => {
  const orderDate = order.date
    ? new Date(order.date).toLocaleDateString()
    : null

  return (
    <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center text-sm sm:justify-between sm:space-x-6 lg:space-x-4">
      <h3 className="sr-only">
        Order placed on <time dateTime={order.date ?? ""}>{order.date}</time>
      </h3>{" "}
      <div className="flex justify-between sm:block">
        <dt className="font-medium text-gray-900">Date placed</dt>
        <dd className="sm:mt-1">
          <time dateTime={order.date ?? ""}>{orderDate}</time>
        </dd>
      </div>
      <div className="flex justify-between pt-6 sm:block sm:pt-0">
        <dt className="font-medium text-gray-900">Order number</dt>
        <dd className="sm:mt-1">{order.orderNumber}</dd>
      </div>
      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
        <dt>Total Quantity</dt>
        <dd className="sm:mt-1 text-gray-600">
          {order.lineItems?.nodes &&
            order.lineItems?.nodes
              .map((item: LineItem) => item?.quantity)
              .reduce(function (itemA, itemB) {
                if (itemA && itemB) {
                  return Number(itemA) + Number(itemB)
                }
                return 0
              })}
        </dd>
      </div>
      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
        <dt>Status</dt>
        <dd className="sm:mt-1 text-gray-600">{order.status}</dd>
      </div>
      {detailsLink && (
        <Link
          href={`/order?number=${order.orderNumber}`}
          className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
        >
          View Details
          <span className="sr-only">for order {order.orderNumber}</span>
        </Link>
      )}
    </div>
  )
}

export default OrderSummary

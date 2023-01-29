import { Order } from "@api/codegen/graphql"
import CheckIcon from "@heroicons/react/20/solid/CheckIcon"

import Link from "@components/Link"
import OrderDetails from "@components/Orders/Details"

// ####
// #### Types
// ####

type PropsType = {
  order: Order
}

// ####
// #### Component
// ####

const OrderConfirmation = ({ order }: PropsType) => {
  const orderNumber = order.orderNumber
  return (
    <>
      <h2 className="text-4xl font-extrabold text-gray-800 text-center">
        Thank you!
      </h2>
      <div className="flex items-center rounded bg-green-100 shadow w-fit p-2 mt-4 mx-auto">
        <CheckIcon className="h-8 w-8 text-green-main mr-2" />
        <p className="text-gray-600">Order #{orderNumber} has been placed.</p>
      </div>
      <div className="mt-6 pt-6 border-t">
        {order ? (
          <OrderDetails order={order} />
        ) : (
          <div className="px-6 text-gray-500">
            <div className="pb-4">
              Order details are only visible on our website for orders placed
              with a user account. Please{" "}
              <span className="font-bold">save your order number</span> ( #
              {orderNumber} ) for future reference.
            </div>
            <div>
              A sales representative will contact you to finish processing your
              order. If you have any questions, please{" "}
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
}

export default OrderConfirmation

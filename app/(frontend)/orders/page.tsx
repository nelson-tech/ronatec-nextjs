import OrderSummary from "@components/OrderSummary"
import getOrders from "./orders.load"

// ####
// #### Server Calls
// ####

// ####
// #### Component
// ####

// TODO - Handle errors and auth

const OrdersPage = async () => {
  const ordersData = await getOrders()
  return (
    <>
      <div className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <div className="w-full relative flex items-center">
            <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order History
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        {ordersData?.docs && (
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-8">
              {ordersData.docs.map((order) => {
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
    </>
  )
}

export default OrdersPage

export const revalidate = 0 // dynamically serve this page

export const metadata = {
  title: "Orders",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

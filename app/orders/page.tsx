import useClient from "@api/client"
import { GetOrdersDataDocument, Order } from "@api/codegen/graphql"
import OrderSummary from "@components/Orders/Summary"
import getTokens from "@lib/utils/getTokens"

// ####
// #### Server Calls
// ####

const getOrders = async () => {
  const { tokens } = await getTokens()

  const client = useClient(tokens)
  try {
    client.setHeader("auth", "true")
    const ordersData = await client.request(GetOrdersDataDocument)
    client.setHeader("auth", "false")

    return ordersData.orders?.nodes
  } catch (error) {
    console.warn("Error fetching orders:", error)
    return null
  }
}

// ####
// #### Component
// ####

// TODO - Handle errors and auth

const OrdersPage = async () => {
  const orders = await getOrders()
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

        {orders && (
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-8">
              {orders.map(order => {
                if (order.orderNumber) {
                  return (
                    <div key={order.orderNumber}>
                      <OrderSummary order={order as Order} detailsLink />
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

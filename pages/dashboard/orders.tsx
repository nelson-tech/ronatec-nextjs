import { useEffect, useState } from "react"
import { InferGetStaticPropsType } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useApolloClient, useQuery } from "@apollo/client"
import isEqual from "lodash.isequal"
import { RefreshIcon } from "@heroicons/react/outline"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useAuth, useMainMenu } from "@lib/hooks"
import { normalize } from "@api/utils"
import { Order } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import { getUserOrders } from "@api/queries/pages/dashboard"

import LoadingDots from "@components/ui/LoadingDots"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const OrderSummary = dynamic(
  () => import("@components/OrderSummary"),
  importOpts,
)

// ####
// #### Component
// ####

const Orders = ({
  // page,
  menuItems,
}: // loading,
// error,
InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const router = useRouter()
  const client = useApolloClient()

  const [refreshing, setRefreshing] = useState(false)
  const [orders, setOrders] = useState<Order[] | undefined>()

  const {
    data: ordersData,
    error: ordersError,
    loading: ordersLoading,
  } = useQuery(getUserOrders, {
    errorPolicy: "all",
  })

  const { loggedIn } = useAuth()

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login", { query: { redirect: router.asPath } })
    }
  })

  useEffect(() => {
    if (router.query.name) {
    }
  }, [router])

  useEffect(() => {
    const newOrders =
      ordersData && ordersData.orders && ordersData.orders.nodes
        ? ordersData.orders.nodes
        : undefined

    if (newOrders && !isEqual(newOrders, orders)) {
      setOrders(newOrders)
    }
  }, [orders, ordersData])

  const refreshOrders = async (query: string) => {
    setRefreshing(true)
    await client.refetchQueries({ include: [query] })
    setRefreshing(false)
  }

  if (loggedIn && orders) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <div className="w-full relative flex items-center">
            <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order History
            </h1>
            <div
              className="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
              onClick={() => refreshOrders("GetUserOrdersQuery")}
              title="Refresh orders"
            >
              <h2 className="sr-only">Refresh orders</h2>
              <div className="flip">
                <RefreshIcon
                  className={`h-6 w-6${
                    refreshing && " animate-reverse-spin text-green-main"
                  }`}
                />
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-8">
            {orders.map(order => {
              if (order.orderNumber && order.date) {
                const orderDate = new Date(order.date).toLocaleDateString()

                return (
                  <div key={order.orderNumber}>
                    <OrderSummary order={order} detailsLink />
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
      <div className="">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Loading Order history...
        </h1>
        <div className="h-10 w-10 mt-4">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export default Orders

// ####
// #### External Props
// ####

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: {
      // loading,
      // page,
      menuItems,
      // error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

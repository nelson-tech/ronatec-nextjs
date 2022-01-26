import { useEffect, useState } from "react"
import { Order } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import { getUserOrders } from "@api/queries/pages/dashboard"
import { normalize } from "@api/utils"
import { gql, useApolloClient, useQuery } from "@apollo/client"
import { LoadingDots, MenuLink } from "@components/ui"
import { addApolloState, initializeApollo } from "@lib/apollo"
import { useAuth, useMainMenu } from "@lib/hooks"
import { InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { RefreshIcon } from "@heroicons/react/outline"
import isEqual from "lodash.isequal"

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
              <RefreshIcon
                className={`h-6 w-6${
                  refreshing && " animate-spin text-green-main"
                }`}
              />
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
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.date || ""}>{order.date}</time>
                    </h3>

                    <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-4">
                      <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8">
                        <div className="flex justify-between sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="sm:mt-1">
                            <time dateTime={order.date || ""}>{orderDate}</time>
                          </dd>
                        </div>
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="sm:mt-1">{order.orderNumber}</dd>
                        </div>
                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                          <dt>Total amount</dt>
                          <dd className="sm:mt-1 text-gray-600">
                            {order.total}
                          </dd>
                        </div>
                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                          <dt>Status</dt>
                          <dd className="sm:mt-1 text-gray-600">
                            {order.status}
                          </dd>
                        </div>
                      </dl>
                      <MenuLink
                        href={`/dashboard/order/${order.orderNumber}`}
                        className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                      >
                        View Details
                        <span className="sr-only">
                          for order {order.orderNumber}
                        </span>
                      </MenuLink>
                    </div>

                    {/* <table className="mt-4 w-full text-gray-500 sm:mt-6">
                        <caption className="sr-only">Products</caption>
                        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                          <tr>
                            <th
                              scope="col"
                              className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                            >
                              Product
                            </th>
                            <th
                              scope="col"
                              className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="hidden pr-8 py-3 font-normal sm:table-cell"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="w-0 py-3 font-normal text-right"
                            >
                              Info
                            </th>
                          </tr>
                        </thead>
                        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                      {order.products.map(product => (
                        <tr key={product.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="w-16 h-16 object-center object-cover rounded mr-6"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {product.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.price}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.status}
                          </td>
                          <td className="py-6 font-medium text-right whitespace-nowrap">
                            <a href={product.href} className="text-indigo-600">
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody> 
                      </table>*/}
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

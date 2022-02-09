import { useEffect, useState } from "react"
import { InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/outline"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useAuth, useMainMenu } from "@lib/hooks"
import { normalize } from "@api/utils"
import { Order } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import { getUserOrder } from "@api/queries/pages/dashboard"
import { useApolloClient, useQuery } from "@apollo/client"

import { OrderDetails } from "@components"
import { LoadingDots, MenuLink } from "@components/ui"

const OrderDetailsPage = ({
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
  const [orderNumber, setOrderNumber] = useState<
    string | string[] | undefined
  >()
  const [order, setOrder] = useState<Order | undefined>()
  const [error, setError] = useState<string | undefined>()

  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useQuery(getUserOrder, {
    variables: { id: router.query.number },
    errorPolicy: "all",
  })

  const { loggedIn, logout, refreshAuthToken } = useAuth()

  useEffect(() => {
    if (orderError) {
      logout()
    }
  }, [orderError, logout])

  useEffect(() => {
    if (router.query.number && !orderNumber) {
      ;(router.query.number as string) && setOrderNumber(router.query.number)
      // const {data} = await client.query({query: getUserOrders, variables: {id: router}})
    }

    if (!order && orderNumber) {
      client
        .query({
          query: getUserOrder,
          variables: { id: router.query.number },
          errorPolicy: "all",
        })
        .then(response => {
          const order = (response?.data?.order as Order) || undefined
          if (order) {
            setOrder(order)
          } else {
            console.log("RES", response)
          }
        })
        .catch(error => {
          console.log("ERR", error)
        })
    }
  }, [router.query, orderNumber, order, client])

  // useEffect(() => {
  //   const newOrder =
  //     orderData && orderData.orders && orderData.order.nodes
  //       ? orderData.order.nodes
  //       : undefined

  //   if (newOrder && !isEqual(newOrder, order)) {
  //     setOrder(newOrder)
  //   }
  // }, [order, orderData])

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login", { query: { redirect: router.asPath } })
    }
  })

  const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if (loggedIn && order) {
    const orderDate = order.date
      ? new Date(order.date).toLocaleDateString()
      : null
    return (
      <div className="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <div className="w-full relative flex items-center">
            <h1 className="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order Details
            </h1>
            <MenuLink
              className="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
              title="Return to orders"
              href="/dashboard/orders"
            >
              <h2 className="sr-only">Return to orders</h2>
              <ArrowLeftIcon
                className={`h-6 w-6${
                  refreshing && " animate-spin text-green-main"
                }`}
              />
            </MenuLink>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-8">
            <OrderDetails order={order} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
      <div className="">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Loading Order Details...
        </h1>
        <div className="h-10 w-10 mt-4">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage

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

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

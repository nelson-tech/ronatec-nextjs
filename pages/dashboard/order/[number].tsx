import { useEffect, useState } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"
import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon"

import useAuth from "@lib/hooks/useAuth"
import { Order } from "@api/gql/types"
import { getUserOrder } from "@api/queries/pages/dashboard"
import { useApolloClient } from "@apollo/client"

import LoadingDots from "@components/ui/LoadingDots"
import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const MenuLink = dynamic(() => import("@components/ui/MenuLink"), importOpts)
const OrderDetails = dynamic(
  () => import("@components/OrderDetails"),
  importOpts,
)

// ####
// #### Component
// ####

const OrderDetailsPage = ({}) => {
  const router = useRouter()
  const client = useApolloClient()

  const [orderNumber, setOrderNumber] = useState<
    string | string[] | undefined
  >()
  const [order, setOrder] = useState<Order | undefined>()
  // const [error, setError] = useState<string | undefined>()

  const { loggedIn } = useAuth()

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

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login", { query: { redirect: router.asPath } })
    }
  })

  if (loggedIn && order) {
    const orderDate = order.date
      ? new Date(order.date).toLocaleDateString()
      : null
    return (
      <>
        <PageTitle
          title={"Order #" + orderNumber}
          description="Order details."
          banner={false}
        />

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
                <ArrowLeftIcon className={"h-6 w-6"} />
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
      </>
    )
  }
  return (
    <>
      <PageTitle
        title={"Order #" + orderNumber}
        description="Order details."
        banner={false}
      />

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
    </>
  )
}

export default OrderDetailsPage

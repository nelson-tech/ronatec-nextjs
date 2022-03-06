import { useEffect, useState } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"
import { useApolloClient } from "@apollo/client"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"
import CheckIcon from "@heroicons/react/solid/CheckIcon"

import { getUserOrder } from "@api/queries/pages/dashboard"
import { Order } from "@api/gql/types"

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

const Thanks = ({}) => {
  const [loading, setLoading] = useState(false)

  const [orderNumber, setOrderNumber] = useState<
    string | string[] | undefined
  >()

  const [order, setOrder] = useState<Order | undefined>()

  const router = useRouter()
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (router.query.order && !orderNumber) {
      setLoading(true)
      const orderNum = router.query.order
      setOrderNumber(orderNum)
      apolloClient
        .query({
          query: getUserOrder,
          variables: { id: orderNum },
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
        .then(() => {
          setLoading(false)
        })
    }
  }, [router, orderNumber, setOrderNumber, apolloClient])

  useEffect(() => {
    if (orderNumber && !order) {
    }
  })

  return orderNumber ? (
    <>
      <PageTitle
        title="Thank you!"
        description="Landing page for recently completed orders."
        banner={false}
      />

      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            Thank you!
          </h2>
          <div className="flex items-center rounded bg-green-100 shadow w-fit p-2 mt-4 mx-auto">
            <CheckIcon className="h-8 w-8 text-green-main mr-2" />
            <p className="text-gray-600">
              Order #{orderNumber} has been placed.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t">
            {order ? (
              <OrderDetails order={order} />
            ) : loading ? (
              <>
                <div className="px-6 text-gray-500 flex items-center">
                  Fetching order details...
                  <RefreshIcon className="h-6 w-6 text-green-main animate-reverse-spin ml-2" />
                </div>
              </>
            ) : (
              <div className="px-6 text-gray-500">
                <div className="pb-4">
                  Order details are only visible on our website for orders
                  placed with a user account. Please{" "}
                  <span className="font-bold">save your order number</span> ( #
                  {orderNumber} ) for future reference.
                </div>
                <div>
                  A sales representative will contact you to finish processing
                  your order. If you have any questions, please{" "}
                  <MenuLink
                    href="/about/contact"
                    className="underline text-blue-main hover:text-green-main"
                  >
                    contact us
                  </MenuLink>{" "}
                  with your order number ( #{orderNumber} ).
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 w-full">
          <h2 className="text-xl font-extrabold text-gray-400 text-center">
            Oops, no order number found...
          </h2>
        </div>
      </div>
    </>
  )
}

export default Thanks

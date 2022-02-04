import { InferGetStaticPropsType } from "next"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"

import { getGeneralPageData } from "@api/queries/pages"
import { normalize } from "@api/utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CheckIcon } from "@heroicons/react/solid"
import { OrderDetails } from "@components"
import { Order } from "@api/gql/types"
import { useApolloClient } from "@apollo/client"
import { getUserOrder } from "@api/queries/pages/dashboard"
import { MenuLink } from "@components/ui"

const Thanks = ({
  // page,
  menuItems,
}: // loading,
// error,
InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const [orderNumber, setOrderNumber] = useState<
    string | string[] | undefined
  >()

  const [order, setOrder] = useState<Order | undefined>()

  const router = useRouter()
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (router.query.order && !orderNumber) {
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
    }
  }, [router, orderNumber, setOrderNumber, apolloClient])

  useEffect(() => {
    if (orderNumber && !order) {
    }
  })

  return (
    <>
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
  )
}

export default Thanks

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

import { Order } from "@api/codegen/graphql"
import getOrderById from "@lib/server/getOrderById"

import OrderConfirmation from "@components/OrderConfirmation"
import { Metadata } from "next/types"

// ####
// #### Types
// ####

type ThanksPageParamsType = {
  searchParams?: { order: string }
}

// ####
// #### Component
// ####

// TODO - Fix error/missing display order

const ThanksPage = async ({ searchParams }: ThanksPageParamsType) => {
  const order = await getOrderById(searchParams?.order)

  // const loggedIn = useStore(state => state.auth.loggedIn)

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 w-full h-full">
          {order ? (
            <OrderConfirmation order={order as Order} />
          ) : (
            <>
              <div>
                <h2 className="text-xl font-extrabold text-gray-400 text-center">
                  <p>Oops, no order found...</p>
                  <p>
                    Please contact us if you think there&apos;s been a mistake.
                  </p>
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ThanksPage

export const revalidate = 0 // dynamically server this page

export async function generateMetadata(
  params: ThanksPageParamsType
): Promise<Metadata> {
  const order = await getOrderById(params?.searchParams?.order)
  const orderNumber = order?.orderNumber

  const metaData = {
    title: orderNumber
      ? `Order #${orderNumber} Confirmation`
      : `Order Confirmation`,
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

  return metaData
}

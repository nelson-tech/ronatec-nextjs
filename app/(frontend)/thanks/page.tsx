import OrderConfirmation from "./OrderConfirmation"
import { Metadata } from "next/types"
import Link from "@components/Link"
import getOrderById from "../order/order.load"

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
  const ordersData = await getOrderById(searchParams?.order)

  const order = (ordersData?.totalDocs ?? 0) > 0 ? ordersData?.docs.at(0) : null

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 w-full h-full">
          {order ? (
            <OrderConfirmation order={order} />
          ) : (
            <>
              <div className="mx-auto max-w-md text-gray-700">
                <h2 className="text-xl font-extrabold text-gray-400 text-center">
                  Oops, no order found...
                </h2>
                <p className="my-8">
                  If you checked out as a guest, you won&apos;t be able to see
                  order details here, but a copy of your order has been emailed
                  to you.
                </p>
                <p>
                  Please{" "}
                  <Link
                    href={"/about/contact"}
                    className="text-accent hover:text-highlight transition-colors underline"
                  >
                    contact us
                  </Link>{" "}
                  if you think there&apos;s been a mistake.
                </p>
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
  const ordersData = await getOrderById(params?.searchParams?.order)

  const order = (ordersData?.totalDocs ?? 0) > 0 ? ordersData?.docs.at(0) : null
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

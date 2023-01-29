import { Order } from "@api/codegen/graphql"
// import useStore from "@lib/hooks/useStore"
import getOrderById from "@lib/serverCalls/getOrderById"

import OrderConfirmation from "@components/OrderConfirmation"
// import Link from "@components/Link"

// ####
// #### Component
// ####

// TODO - Fix error/missing display order

const ThanksPage = async ({
  searchParams,
}: {
  searchParams?: { order: string }
}) => {
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
              {/* {loggedIn && (
                <div className="mt-8 text-center text-gray-500">
                  <p>
                    You can view your previous orders from the{" "}
                    <Link
                      href="/orders"
                      className="text-blue-main hover:text-green-main transition underline"
                    >
                      dashboard
                    </Link>
                    .
                  </p>
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ThanksPage

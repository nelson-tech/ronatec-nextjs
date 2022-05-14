import { FullProduct } from "@lib/types"
import { Order } from "@api/gql/types"

import OrderSummary from "./Summary"
import LineItem from "./LineItem"

// ####
// #### Types
// ####

type PropsType = {
  order: Order
}

// ####
// #### Component
// ####

const OrderDetails = ({ order }: PropsType) => {
  // const orderDate = order.date
  //   ? new Date(order.date).toLocaleDateString()
  //   : null

  // const numberWithCommas = (x: string) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // }

  return (
    <div key={order.orderNumber}>
      <h3 className="sr-only">
        Order placed on <time dateTime={order.date || ""}>{order.date}</time>
      </h3>

      <OrderSummary order={order} />

      <table className="mt-4 w-full text-gray-500 sm:mt-6">
        <caption className="sr-only">Products</caption>
        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
          <tr>
            <th scope="col" className="pr-8 py-3 font-normal">
              Product
            </th>
            {/* <th
              scope="col"
              className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
            >
              Price
            </th> */}
            <th
              scope="col"
              className="hidden pr-8 py-3 font-normal sm:table-cell"
            >
              Qty
            </th>
            {/* <th
              scope="col"
              className="hidden pr-8 py-3 font-normal sm:table-cell"
            >
              Total
            </th> */}
            <th scope="col" className="w-0 py-3 font-normal text-right">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
          {order.lineItems?.nodes &&
            order.lineItems.nodes.map(lineItem => {
              const product = lineItem?.product?.node
                ? (lineItem.product.node as FullProduct)
                : null
              if (product) {
                return (
                  <LineItem
                    key={product.id}
                    product={product}
                    quantity={lineItem?.quantity}
                  />
                )
              }
            })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetails

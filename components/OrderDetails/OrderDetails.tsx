import { Order } from "@api/gql/types"
import { FullProduct } from "@lib/types"

import { Image } from "@components"

type OrderDetailsPropsType = {
  order: Order
}

const OrderDetails = ({ order }: OrderDetailsPropsType) => {
  const orderDate = order.date
    ? new Date(order.date).toLocaleDateString()
    : null

  const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div key={order.orderNumber}>
      <h3 className="sr-only">
        Order placed on <time dateTime={order.date || ""}>{order.date}</time>
      </h3>

      <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center text-sm sm:justify-between sm:space-x-6 lg:space-x-4">
        {/* <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8"> */}
        <div className="flex justify-between sm:block">
          <dt className="font-medium text-gray-900">Date placed</dt>
          <dd className="sm:mt-1">
            <time dateTime={order.date || ""}>{orderDate}</time>
          </dd>
        </div>
        <div className="flex justify-between pt-6 sm:block sm:pt-0">
          <dt className="font-medium text-gray-900">Order number</dt>
          <dd className="sm:mt-1">{order.orderNumber}</dd>
        </div>
        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <dt>Total amount</dt>
          <dd className="sm:mt-1 text-gray-600">{order.total}</dd>
        </div>
        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <dt>Status</dt>
          <dd className="sm:mt-1 text-gray-600">{order.status}</dd>
        </div>
        {/* </dl> */}
      </div>

      <table className="mt-4 w-full text-gray-500 sm:mt-6">
        <caption className="sr-only">Products</caption>
        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
          <tr>
            <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
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
              Qty
            </th>
            <th
              scope="col"
              className="hidden pr-8 py-3 font-normal sm:table-cell"
            >
              Total
            </th>
            <th scope="col" className="w-0 py-3 font-normal text-right">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
          {order.lineItems?.nodes &&
            order.lineItems.nodes.map(lineItem => {
              const product = lineItem?.product
                ? (lineItem.product as FullProduct)
                : null
              if (product) {
                return (
                  <tr key={product.id}>
                    <td className="py-6 pr-8">
                      <div className="flex items-center">
                        {product.image && product.image.sourceUrl && (
                          <div className="w-16 object-center object-cover rounded overflow-hidden mr-6">
                            <Image
                              src={product.image.sourceUrl}
                              alt={product.image.altText || ""}
                              height={product.image.mediaDetails?.height}
                              width={product.image.mediaDetails?.width}
                              objectFit="contain"
                              layout="responsive"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="mt-1 sm:hidden">{product.price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-6 pr-8 sm:table-cell">
                      {product.price}
                    </td>
                    <td className="py-6 pl-2.5 pr-8">
                      <div className="hidden sm:table-cell">
                        {lineItem?.quantity}
                      </div>
                      <div className="table-cell sm:hidden">
                        <div className="w text-right">
                          x{lineItem?.quantity}
                        </div>
                        <div className="border-t">
                          {"$" +
                            (lineItem?.total &&
                              numberWithCommas(lineItem?.total))}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-6 pr-8 sm:table-cell">
                      {"$" +
                        (lineItem?.total && numberWithCommas(lineItem?.total))}
                    </td>
                    <td className="py-6 font-medium text-right whitespace-nowrap">
                      <a
                        href={`/products/${
                          product.productCategories?.nodes &&
                          product.productCategories.nodes[0]?.slug
                        }/${product.slug}`}
                        className="text-blue-main"
                      >
                        View
                        <span className="hidden lg:inline"> Product</span>
                        <span className="sr-only">, {product.name}</span>
                      </a>
                    </td>
                  </tr>
                )
              }
            })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetails

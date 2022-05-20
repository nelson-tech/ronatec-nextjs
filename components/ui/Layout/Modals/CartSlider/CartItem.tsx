import { memo, useState } from "react"

import useCart from "@lib/hooks/useCart"
import { CartItem as CartItemType, Maybe } from "@api/gql/types"

import Image from "@components/Image"
import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

type PropsType = {
  lineItem: Maybe<CartItemType>
  setOpen: (open: boolean) => void
}

const CartItem = memo(
  function CartItem({ lineItem, setOpen }: PropsType) {
    const [loading, setLoading] = useState(false)
    const removeItem = useCart().removeItem

    const handleRemoveItem = async (key: string) => {
      setLoading(true)
      const { data, error } = await removeItem({ keys: [key] })
      // TODO - Handle error case
    }

    const category =
      (lineItem?.product?.node?.productCategories?.nodes &&
        lineItem?.product?.node.productCategories.nodes[0]?.slug) ||
      ""

    return (
      <>
        <div className="py-6 relative">
          {lineItem?.product?.node && (
            <li className="flex items-center">
              {lineItem?.product?.node?.image && (
                <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={lineItem?.product?.node.image.sourceUrl || ""}
                    alt={lineItem?.product?.node.image.altText || ""}
                    layout="responsive"
                    objectFit="cover"
                    width={lineItem?.product?.node.image.mediaDetails?.width}
                    height={lineItem?.product?.node.image.mediaDetails?.height}
                  />
                </div>
              )}

              <div className="ml-4 flex-1 flex flex-col mb-1">
                <div className="flex justify-between items-center ">
                  <h3 onClick={() => setOpen(false)}>
                    <Link
                      href={`/products/${category}/${lineItem?.product?.node.slug}`}
                      className="font-bold text-sm text-gray-900"
                    >
                      {lineItem?.product?.node.name}
                    </Link>
                  </h3>
                  {/* <p className="ml-4 text-xs text-gray-500">
                  {lineItem.subtotal}
                </p> */}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {lineItem.variation?.attributes
                    ?.map(
                      attribute => `${attribute?.label} - ${attribute?.value}`,
                    )
                    .join(" - ")}
                </p>

                <div className="flex-1 flex items-start justify-between text-sm mt-1">
                  <p className="text-gray-500">Qty {lineItem.quantity}</p>
                  <div className="flex">
                    {loading ? (
                      <LoadingSpinner className="mr-4" size={4} />
                    ) : (
                      <button
                        type="button"
                        title="Remove"
                        className="font-medium text-blue-main hover:text-red-600"
                        onClick={() => handleRemoveItem(lineItem.key)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )}
        </div>
      </>
    )
  },
  function areEqual(prev, next) {
    if (prev.lineItem?.product?.node?.id === next.lineItem?.product?.node?.id)
      return true
    return false
  },
)

export default CartItem

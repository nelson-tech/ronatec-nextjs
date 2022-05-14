import { memo } from "react"

import useCart from "@lib/hooks/useCart"
import { CartItem as CartItemType, Maybe } from "@api/gql/types"

import Image from "@components/Image"
import Link from "@components/Link"

type PropsType = {
  lineItem: Maybe<CartItemType>
  setOpen: (open: boolean) => void
}

const CartItem = memo(
  function CartItem({ lineItem, setOpen }: PropsType) {
    const { removeItem } = useCart()

    const product = lineItem?.product?.node

    const handleRemoveItem = async (key: string) => {
      await removeItem({ keys: [key] })
    }

    if (product) {
      const category =
        (product.productCategories?.nodes &&
          product.productCategories.nodes[0]?.slug) ||
        ""

      return (
        <>
          <li className="py-6 flex items-center">
            {product.image && (
              <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={product.image.sourceUrl || ""}
                  alt={product.image.altText || ""}
                  layout="responsive"
                  objectFit="cover"
                  width={product.image.mediaDetails?.width}
                  height={product.image.mediaDetails?.height}
                />
              </div>
            )}

            <div className="ml-4 flex-1 flex flex-col mb-1">
              <div className="flex justify-between items-center ">
                <h3 onClick={() => setOpen(false)}>
                  <Link
                    href={`/products/${category}/${product.slug}`}
                    className="font-bold text-sm text-gray-900"
                  >
                    {product.name}
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

              <div className="flex-1 flex items-end justify-between text-sm mt-1">
                <p className="text-gray-500">Qty {lineItem.quantity}</p>
                <div className="flex">
                  <button
                    type="button"
                    title="Remove"
                    className="font-medium text-blue-main hover:text-red-600"
                    onClick={() => handleRemoveItem(lineItem.key)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        </>
      )
    }
    return null
  },
  function areEqual(prevProps, nextProps) {
    if (prevProps.lineItem === nextProps.lineItem) {
      return true
    }
    return false
  },
)

export default CartItem

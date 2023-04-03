import { memo, useState } from "react"
import { TrashIcon } from "@heroicons/react/20/solid"

import type { CartItem as CartItemType } from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"

import Image from "@components/Image"
import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Types
// ####

type PropsType = {
  lineItem: CartItemType
  setOpen?: (open: boolean) => void
}

// ####
// #### Component
// ####

const CartItem = memo(
  function CartItemMemo({ lineItem, setOpen }: PropsType) {
    const [loading, setLoading] = useState(false)
    const { removeItem } = useCart()

    const handleRemoveItem = async (key: string) => {
      setLoading(true)
      await removeItem({ input: { keys: [key] } })
      // TODO - Handle error case
    }

    const category =
      (lineItem?.product?.node?.productCategories?.nodes &&
        lineItem?.product?.node.productCategories.nodes[0]?.slug) ??
      ""

    return (
      <>
        {lineItem?.product?.node && (
          <li className="py-6 flex items-center justify-between">
            {lineItem?.product?.node?.image && (
              <div className="relative mr-4">
                <Image
                  src={lineItem?.product?.node.image.sourceUrl ?? ""}
                  alt={lineItem?.product?.node.image.altText ?? ""}
                  width={
                    lineItem?.product?.node.image.mediaDetails?.width ??
                    undefined
                  }
                  height={
                    lineItem?.product?.node.image.mediaDetails?.height ??
                    undefined
                  }
                  className="w-16 max-h-16 md:w-24 md:max-h-24 border border-gray-200 rounded overflow-hidden"
                />
              </div>
            )}

            <div className="w-full h-full flex flex-col justify-center">
              <h3 onClick={() => setOpen && setOpen(false)}>
                <Link
                  href={`/products/${category}/${lineItem?.product?.node.slug}`}
                  className="font-bold text-sm text-gray-900"
                >
                  {lineItem?.product?.node.name}
                </Link>
              </h3>
              {lineItem.variation?.attributes &&
                lineItem.variation?.attributes.length > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    {lineItem.variation.attributes
                      ?.map((attribute) => `${attribute?.value}`)
                      .join(" - ")}
                  </p>
                )}
            </div>
            <div className="">
              {loading ? (
                <LoadingSpinner className="mr-4" size={4} />
              ) : (
                <TrashIcon
                  title="Remove item"
                  className="text-gray-500 hover:text-red-600 transition-colors h-6 cursor-pointer"
                  onClick={async () => await handleRemoveItem(lineItem.key)}
                />
              )}
            </div>
          </li>
        )}
      </>
    )
  },
  function areEqual(prev, next) {
    if (
      prev.lineItem?.product?.node?.id === next.lineItem?.product?.node?.id &&
      prev.lineItem?.quantity === next.lineItem?.quantity
    )
      return true
    return false
  }
)

export default CartItem

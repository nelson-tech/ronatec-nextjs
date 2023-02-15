import { memo, useState } from "react"
import MinusIcon from "@heroicons/react/20/solid/MinusIcon"
import PlusIcon from "@heroicons/react/20/solid/PlusIcon"

import useCart from "@lib/hooks/useCart"
// import { CartItem as CartItemType, Maybe } from "@api/codegen/graphql"

import Image from "@components/Image"
import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import { CartItem } from "@api/codegen/graphql"

// ####
// #### Types
// ####

type PropsType = {
  lineItem: CartItem
  setOpen?: (open: boolean) => void
}

// ####
// #### Component
// ####

const CartItem = memo(
  function CartItem({ lineItem, setOpen }: PropsType) {
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(lineItem?.quantity)
    const { updateCart, removeItem } = useCart()

    const handleRemoveItem = async (key: string) => {
      setLoading(true)
      const removeItemData = await removeItem({ input: { keys: [key] } })
      // TODO - Handle error case
    }

    const category =
      (lineItem?.product?.node?.productCategories?.nodes &&
        lineItem?.product?.node.productCategories.nodes[0]?.slug) ||
      ""

    const handleQuantityUpdate = async (newQuantity: number) => {
      setQuantity(newQuantity)

      console.log(newQuantity)

      if (quantity && lineItem?.key) {
        const updateCartData = await updateCart({
          input: {
            items: [{ key: lineItem?.key, quantity: newQuantity }],
          },
        })
        updateCartData.updateItemQuantities?.cart &&
          console.log(updateCartData.updateItemQuantities.cart)
        // TODO - Handle error case
      }
    }

    return (
      <>
        <div className="py-6 relative">
          {lineItem?.product?.node && (
            <li className="flex items-center">
              {lineItem?.product?.node?.image && (
                <div
                  className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden`}
                >
                  <Image
                    src={lineItem?.product?.node.image.sourceUrl || ""}
                    alt={lineItem?.product?.node.image.altText || ""}
                    // layout="responsive"
                    // objectFit="cover"
                    width={lineItem?.product?.node.image.mediaDetails?.width}
                    height={lineItem?.product?.node.image.mediaDetails?.height}
                  />
                </div>
              )}

              <div className="ml-4 flex-1 flex flex-col mb-1 justify-between">
                <div className="flex justify-between items-center ">
                  <h3 onClick={() => setOpen && setOpen(false)}>
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
                    ?.map(attribute => `${attribute?.value}`)
                    .join(" - ")}
                </p>

                <div className="flex-1 flex items-center justify-between text-sm mt-3">
                  {quantity && (
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <label htmlFor="quantity" className="pr-2">
                        Quantity:{" "}
                      </label>
                      <MinusIcon
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleQuantityUpdate(quantity - 1)}
                      />
                      <input
                        className="w-16 text-center border py-1 text-xs rounded outline-none focus:bg-white ring-transparent"
                        value={quantity}
                        id="quantity"
                        name="quantity"
                        type="number"
                        min={1}
                        onChange={async e => {
                          if (Number(e.target.value)) {
                            await handleQuantityUpdate(Number(e.target.value))
                          }
                        }}
                      />
                      <PlusIcon
                        className="h-3 w-3 cursor-pointer"
                        onClick={async () =>
                          await handleQuantityUpdate(quantity + 1)
                        }
                      />
                    </div>
                  )}
                  <div className="">
                    {loading ? (
                      <LoadingSpinner className="mr-4" size={4} />
                    ) : (
                      <button
                        type="button"
                        title="Remove"
                        className="font-medium text-accent hover:text-red-600 transition"
                        onClick={async () =>
                          await handleRemoveItem(lineItem.key)
                        }
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
    if (
      prev.lineItem?.product?.node?.id === next.lineItem?.product?.node?.id &&
      prev.lineItem?.quantity === next.lineItem?.quantity
    )
      return true
    return false
  },
)

export default CartItem

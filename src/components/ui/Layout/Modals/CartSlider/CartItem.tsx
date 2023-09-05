import { memo, useCallback, useEffect, useState } from "react"
import { TrashIcon } from "@heroicons/react/20/solid"

import Image from "@components/Image"
import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import { ProductItems } from "~payload-types"
import range from "@utils/range"
import useCart from "@hooks/useCart"

// ####
// #### Types
// ####

type PropsType = {
  lineItem: ProductItems[0]
  setOpen?: (open: boolean) => void
  removeFromCart: (productId: string) => void
  setCartLoading: (loading: boolean) => void
}

// ####
// #### Component
// ####

const CartItem = ({
  lineItem,
  setOpen,
  removeFromCart,
  setCartLoading,
}: PropsType) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [quantityLoading, setQuantityLoading] = useState(false)
  const [quantity, setQuantity] = useState(lineItem.quantity)

  const { updateCartItemQuantity } = useCart()

  const updateQuantity = useCallback(async () => {
    setQuantityLoading(true)
    await updateCartItemQuantity({ ...lineItem, quantity })
    setQuantityLoading(false)
    return
  }, [lineItem, quantity, updateCartItemQuantity])

  useEffect(() => {
    if (lineItem.quantity !== quantity) {
      console.log("Updating", lineItem.quantity, quantity)

      updateQuantity().then(() => {})
    }
  }, [lineItem.quantity, quantity, updateQuantity])

  const { product } = lineItem
  if (typeof product !== "object") {
    // TODO: fetch product instead of returning empty component

    return <></>
  }

  const firstCategory =
    typeof product === "object" && (product.categories?.length ?? 0) > 0
      ? product.categories?.at(0)
      : null

  const categorySlug =
    typeof firstCategory === "object" ? firstCategory?.slug : null

  const wcImage =
    product?.wc?.images && (product.wc.images.length ?? 0) > 0
      ? product.wc?.images[0]
      : null

  const price = lineItem.totals?.formatted?.total

  const quantityAvailable = product.manageStock ? product.stock : 9999

  const handleRemoveItem = async (key: string | null | undefined) => {
    setCartLoading(true)
    setDeleteLoading(true)
    key && (await removeFromCart(key))
    // TODO - Handle error case
  }

  return (
    <>
      {typeof product === "object" && (
        <li className="py-6 flex items-center justify-between">
          <div className="relative mr-4 w-16 h-16 md:w-24 md:h-24 flex justify-center items-center">
            {typeof product?.featuredImage === "object" ? (
              <Image
                src={product?.featuredImage.url ?? ""}
                alt={product?.featuredImage.alt ?? ""}
                width={product?.featuredImage.width ?? 0}
                height={product?.featuredImage.height ?? undefined}
                className="w-16 max-h-16 md:w-24 md:max-h-24 border border-gray-200 rounded overflow-hidden"
              />
            ) : (
              wcImage && (
                <Image
                  src={wcImage.src ?? ""}
                  alt={wcImage.alt ?? ""}
                  width={100}
                  height={100}
                  className="w-16 max-h-16 md:w-24 md:max-h-24 border border-gray-200 rounded object-contain overflow-hidden"
                />
              )
            )}
          </div>

          <div className="w-full h-full flex flex-col justify-center">
            <h3 onClick={() => setOpen && setOpen(false)}>
              <Link
                href={`/products/${categorySlug}/${product?.slug}`}
                className="font-bold text-sm text-gray-900 hover:text-accent transition-colors"
              >
                {product?.title}
              </Link>
            </h3>
            {/* {lineItem.variation?.attributes &&
                lineItem.variation?.attributes.length > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    {lineItem.variation.attributes
                      ?.map((attribute) => `${attribute?.value}`)
                      .join(" - ")}
                  </p>
                )} */}
            <div className="flex justify-between items-center mt-4">
              {(quantityAvailable ?? 0) > 1 && (
                <>
                  <label htmlFor={`quantity-${product.id}`} className="sr-only">
                    Quantity, {product.title}
                  </label>
                  <select
                    id={`quantity-${product.id}`}
                    name={`quantity-${product.id}`}
                    disabled={quantityLoading || deleteLoading}
                    value={quantity}
                    onChange={(v) =>
                      setQuantity(Number.parseInt(v.target.value))
                    }
                    className="max-w-full rounded-md border border-gray-300 text-left text-base font-medium leading-5 text-gray-700
                        shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                  >
                    {range(1, Math.min(10, quantityAvailable ?? 9999)).map(
                      (num, i) => (
                        <option key={"cart-slider-" + i + num} value={num}>
                          {num}
                        </option>
                      )
                    )}
                  </select>
                </>
              )}
              {price !== "$0.00" && (
                <p className="text-sm text-gray-700 mr-4">{price}</p>
              )}
            </div>
          </div>
          <div className="">
            {deleteLoading ? (
              <LoadingSpinner className="mr-4" size={4} />
            ) : (
              <TrashIcon
                title="Remove item"
                className="text-gray-500 hover:text-red-600 transition-colors h-6 cursor-pointer"
                onClick={async () =>
                  typeof product === "object" &&
                  (await handleRemoveItem(product?.id))
                }
              />
            )}
          </div>
        </li>
      )}
    </>
  )
}

export default CartItem

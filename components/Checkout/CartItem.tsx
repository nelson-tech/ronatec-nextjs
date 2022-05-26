import { memo, useState } from "react"

import useCart from "@lib/hooks/useCart"
import { CartItem as CartItemType } from "@api/gql/types"

import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Types
// ####

type PropsType = {
  cartItem: CartItemType
  hidePrices?: boolean
}

// ####
// #### Component
// ####

const CartItem = memo(function CartItem({ cartItem, hidePrices }: PropsType) {
  const [loading, setLoading] = useState(false)

  const product = cartItem?.product?.node
  const price = cartItem?.total
  const attributes = cartItem?.variation?.attributes

  const removeItem = useCart().removeItem

  const handleRemoveItem = async (key: string) => {
    setLoading(true)
    const { data, error } = await removeItem({ keys: [key] })
    // TODO - Handle error case
  }

  return (
    <>
      <li className="flex py-6 space-x-6">
        <img
          src={product?.image?.sourceUrl || ""}
          alt={product?.image?.altText || ""}
          className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
        />
        <div className="flex flex-col justify-between space-y-4">
          <div className="text-sm font-medium space-y-1 mt-4">
            <h3 className="text-gray-900">{product?.name}</h3>
            {!hidePrices && <p className="text-gray-900">{price}</p>}
            {attributes?.map(attribute => {
              if (attribute) {
                return (
                  <p className="text-gray-500" key={attribute.id}>
                    {attribute.label} - {attribute.value}
                  </p>
                )
              }
            })}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="text-sm font-medium text-blue-main hover:text-green-main"
            >
              Edit
            </button>
            <div className="flex border-l border-gray-300 pl-4">
              {loading ? (
                <LoadingSpinner className="mr-4" size={4} />
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(cartItem.key)}
                  title="Remove from cart"
                  className="text-sm font-medium text-blue-main hover:text-green-main"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  )
})

export default CartItem

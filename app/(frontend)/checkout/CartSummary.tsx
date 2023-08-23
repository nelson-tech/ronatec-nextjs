import useStore from "@hooks/useStore"

import CartItem from "@components/ui/Layout/Modals/CartSlider/CartItem"
import useCart from "@hooks/useCart"

// ####
// #### Component
// ####

const CartSummary = () => {
  const { cart, setCartLoading } = useStore((stores) => ({
    cart: stores.cart.state,
    setCartLoading: stores.cart.setLoading,
  }))

  const { removeItem } = useCart()
  return (
    <>
      {cart?.items &&
        cart.items.map((lineItem) => {
          if (typeof lineItem === "object")
            return (
              <CartItem
                lineItem={lineItem}
                key={lineItem.id}
                removeFromCart={removeItem}
                setCartLoading={setCartLoading}
              />
            )
        })}
      <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>{cart?.totals?.formatted?.subTotal}</dd>
        </div>

        {/* <div className="flex items-center justify-between">
          <dt className="text-gray-600">Shipping</dt>
          <dd>$15.00</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Taxes</dt>
          <dd>$26.80</dd>
        </div> */}

        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base">Total</dt>
          <dd className="text-base">{cart?.totals?.formatted?.total}</dd>
        </div>
      </dl>
    </>
  )
}

export default CartSummary

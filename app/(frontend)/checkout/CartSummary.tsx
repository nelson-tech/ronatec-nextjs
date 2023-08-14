import useStore from "@hooks/useStore"

import CartItem from "@components/ui/Layout/Modals/CartSlider/CartItem"
import useCart from "@hooks/useCart"

// ####
// #### Component
// ####

const CartSummary = () => {
  const { lineItems, setCartLoading } = useStore((stores) => ({
    lineItems: stores.cart.state?.items,
    setCartLoading: stores.cart.setLoading,
  }))

  const { removeItem } = useCart()
  return (
    <>
      {lineItems &&
        lineItems.map((lineItem) => {
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
    </>
  )
}

export default CartSummary

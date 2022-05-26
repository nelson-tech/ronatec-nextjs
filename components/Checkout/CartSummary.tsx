import useStore from "@lib/hooks/useStore"

import CartItem from "./CartItem"

// ####
// #### Types
// ####

type PropsType = {
  hidePrices?: boolean
}

// ####
// #### Component
// ####

const CartSummary = ({ hidePrices }: PropsType) => {
  const cartItems = useStore(state => state.cart.state)?.contents?.nodes

  return (
    <>
      {cartItems &&
        cartItems.map(cartItem => {
          if (cartItem)
            return (
              <CartItem
                cartItem={cartItem}
                hidePrices={hidePrices}
                key={cartItem?.product?.node?.id}
              />
            )
        })}
    </>
  )
}

export default CartSummary

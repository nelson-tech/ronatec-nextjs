import useStore from "@lib/hooks/useStore"

import CartItem from "@components/ui/Layout/Modals/CartSlider/CartItem"

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
  const lineItems = useStore(state => state.cart.state)?.contents?.nodes

  return (
    <>
      {lineItems &&
        lineItems.map(lineItem => {
          if (lineItem)
            return (
              <CartItem lineItem={lineItem} key={lineItem.product?.node?.id} />
            )
        })}
    </>
  )
}

export default CartSummary

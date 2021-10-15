import { FC } from "react"
import { Bag, Cross } from "@components/icons"
import cn from "classnames"
import tw from "twin.macro"
import { useUI } from "@components/ui/context"

const CartSidebar: FC = () => {
  const { closeSidebar } = useUI()

  const isEmpty = false

  const rootClass = cn("h-full flex flex-col", {
    "bg-secondary text-text-secondary": isEmpty,
  })

  return (
    <div className={rootClass}>
      <header css={tw`px-4 pt-6 pb-4 sm:px-6`}>
        <div css={tw`flex items-start justify-between space-x-3`}>
          <div css={tw`h-7 flex items-center`}>
            <button
              onClick={closeSidebar}
              css={tw`hover:text-gray-500 transition ease-in-out duration-150`}
            >
              <Cross css={tw`h-6 w-6`} onClick={closeSidebar} />
            </button>
          </div>
        </div>
      </header>

      {isEmpty ? (
        <div css={tw`flex-1 px-4 flex flex-col justify-center items-center`}>
          <span
            css={tw`border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-primary`}
          >
            <Bag css={tw`absolute`} />
          </span>
          <h2 css={tw`pt-6 text-2xl font-bold tracking-wide text-center`}>
            Your cart is empty
          </h2>
          <p css={tw`text-accents-3 px-10 text-center pt-2`}>
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : (
        <>
          <div css={tw`px-4 sm:px-6 flex-1`}>
            <h2
              css={tw`pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide inline-block`}
            >
              My Cart
            </h2>
            <ul
              css={tw`py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3`}
            >
              Product
            </ul>
          </div>
          <div css={tw`flex-shrink-0 px-4  py-5 sm:px-6`}>
            <div css={tw`border-t border-accents-3`}>
              <ul css={tw`py-3`}>
                <li css={tw`flex justify-between py-1`}>
                  <span>Subtotal</span>
                  <span>Subtotal</span>
                </li>
                <li css={tw`flex justify-between py-1`}>
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li css={tw`flex justify-between py-1`}>
                  <span>Estimated Shipping</span>
                  <span css={tw`font-bold tracking-wide`}>FREE</span>
                </li>
              </ul>
              <div
                css={tw`flex justify-between border-t border-accents-3 py-3 font-bold mb-10`}
              >
                <span>Total</span>
                <span>Total</span>
              </div>
            </div>
            <button>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebar

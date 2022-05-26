import useStore from "@lib/hooks/useStore"

// ####
// #### Types
// ####

type PropsType = {
  mobile?: boolean
}

// ####
// #### Component
// ####

const PricingSummary = ({ mobile }: PropsType) => {
  const cart = useStore(state => state.cart.state)

  return (
    <>
      <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="text-gray-900">{cart?.subtotal}</dd>
        </div>
        {cart?.appliedCoupons && (
          <div className="flex justify-between">
            <dt className="flex">
              Discount
              <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
                {cart.appliedCoupons.map(coupon => (
                  <>{coupon?.code}</>
                ))}
              </span>
            </dt>

            <dd className="text-gray-900">-{cart?.discountTotal}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>Taxes</dt>
          <dd className="text-gray-900">{cart?.totalTax}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="text-gray-900">{cart?.shippingTotal}</dd>
        </div>
        {mobile ? (
          <></>
        ) : (
          <>
            <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
              <dt>Total</dt>
              <dd className="text-base">{cart?.total}</dd>
            </div>
          </>
        )}
      </dl>
    </>
  )
}

export default PricingSummary

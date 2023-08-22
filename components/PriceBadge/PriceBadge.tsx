import type { Product } from "payload/generated-types"

type PropsType = {
  product: Product | null
  className?: string | undefined
}

const PriceBadge = ({ product, className }: PropsType) => {
  const price = product?.prices?.formatted?.price

  return <>{price !== "$0.00" && <div className={className}>{price}</div>}</>
}

export default PriceBadge

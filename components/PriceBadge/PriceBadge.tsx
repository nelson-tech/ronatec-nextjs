import type { Product } from "payload/generated-types"
import getParsedPrice from "@utils/getParsedPrice"

type PropsType = {
  product: Product | null
  className?: string | undefined
}

const PriceBadge = ({ product, className }: PropsType) => {
  const price = getParsedPrice({ product })
  return <>{price !== "$0.00" && <div className={className}>{price}</div>}</>
}

export default PriceBadge

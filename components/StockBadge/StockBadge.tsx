import { Product } from "payload/generated-types"

type StockBadgeProps = {
  product: Product
}

const StockBadge = ({ product }: StockBadgeProps) => {
  return product.manageStock ? (
    product.inStock ? (
      <div className="mt-8 text-highlight">{product.stock} in stock</div>
    ) : (
      <div className="mt-8 text-red-600">Out of stock</div>
    )
  ) : (
    <></>
  )
}

export default StockBadge

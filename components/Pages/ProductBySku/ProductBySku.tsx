import { ProductCategory } from "@api/codegen/graphql"
import { FullProduct } from "@lib/types/products"

import Breadcrumbs from "@components/Breadcrumbs"
import DefaultProduct from "@components/Product"

// ####
// #### Types
// ####

type PropsType = {
  category: ProductCategory
  product: FullProduct
}

// ####
// #### Component
// ####

const ProductBySku = ({ product, category }: PropsType) => {
  return (
    <>
      <Breadcrumbs category={category} product />
      <DefaultProduct product={product} />
    </>
  )
}

export default ProductBySku

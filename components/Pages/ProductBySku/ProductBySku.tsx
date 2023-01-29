import { FullProduct } from "@lib/types"
import { ProductCategory } from "@api/codegen/graphql"

import Breadcrumbs from "@components/Breadcrumbs"
import DefaultProduct from "@components/Product"

// ####
// #### Dynamic Imports
// ####

// const importOpts = { ssr: false }

// const DefaultProduct = dynamic(() => import("@components/Products"), importOpts)

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

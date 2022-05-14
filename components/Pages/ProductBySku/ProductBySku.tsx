import { FullProduct } from "@lib/types"

import Breadcrumbs from "@components/Breadcrumbs"
import DefaultProduct from "@components/Products"
import { ProductCategory } from "@api/gql/types"

// ####
// #### Dynamic Imports
// ####

// const importOpts = { ssr: false }

// const DefaultProduct = dynamic(() => import("@components/Products"), importOpts)

type PropsType = {
  category: ProductCategory
  product: FullProduct
}

const ProductBySku = ({ product, category }: PropsType) => {
  return (
    <>
      <Breadcrumbs category={category} product />
      <DefaultProduct product={product} />
    </>
  )
}

export default ProductBySku

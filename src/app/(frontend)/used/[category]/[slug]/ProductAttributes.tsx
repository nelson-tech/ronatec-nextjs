import he from "he"

import type { Product } from "~payload-types"

type ProductAttributesProps = {
  product: Product | null | undefined
}

const ProductAttributes = ({ product }: ProductAttributesProps) => {
  return (
    <div id="product-attributes" className="mt-4">
      {product?.attributes
        ? product.attributes.map((attribute) => (
            <div key={attribute.id} className="flex justify-between">
              <p>{attribute.label?.toLocaleUpperCase()}</p>
              <p>{attribute.value}</p>
            </div>
          ))
        : product?.wc?.attributes &&
          product.wc.attributes.length > 0 && (
            <div id="product-attributes" className="divide-y">
              {product.wc.attributes
                .filter((attr) => !!attr.terms?.length)
                .map((attribute) => {
                  if (attribute.terms)
                    return (
                      <div key={attribute.id} className="flex justify-between">
                        <p>{attribute.name?.toLocaleUpperCase()}</p>
                        <p>{he.decode(attribute.terms?.at(0)?.name)}</p>
                      </div>
                    )
                })}
            </div>
          )}
    </div>
  )
}

export default ProductAttributes
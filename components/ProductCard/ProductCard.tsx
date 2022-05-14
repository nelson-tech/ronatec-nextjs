import Link from "next/link"
import { default as parse } from "html-react-parser"

import useStore from "@lib/hooks/useStore"
import { Product } from "@api/gql/types"

import Image from "@components/Image"

// ####
// #### Types
// ####

type ProductCardProps = {
  product: Product & { price?: string }
}

// ####
// #### Component
// ####

const ProductCard = ({ product }: ProductCardProps) => {
  const viewMode = useStore(state => state.ui.viewMode)

  const categorySlug = product.productCategories?.nodes
    ? product.productCategories.nodes[0]?.slug
    : ""

  if (viewMode === "grid") {
    return (
      <div className="group relative bg-white border border-gray-200 rounded-lg w-full flex flex-col overflow-hidden">
        {product.image && product.image.sourceUrl && (
          <div className="bg-gray-200 group-hover:opacity-75">
            <div className="w-full h-full object-center object-cover sm:w-full sm:h-full aspect-square relative">
              <Image
                src={product.image.sourceUrl}
                alt={product.image.altText || ""}
                width={product.image.mediaDetails?.width}
                height={product.image.mediaDetails?.height}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        )}
        <div className="flex-1 space-y-2 flex flex-col w-full">
          <h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-blue-main text-base sm:text-xl">
            <Link href={`/products/${categorySlug}/${product.slug}`} passHref>
              <a title={product.name || ""} className="flex flex-col">
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </Link>
          </h3>
          {/* {product.shortDescription && (
            <div className="text-sm text-gray-600 py-2">
              {parse(product.shortDescription)}
            </div>
          )} */}
          <div className="px-4 pb-2 flex-1 flex flex-col justify-end">
            {/* <p className="text-sm italic text-gray-500">{product.options}</p> 
             <p className="text-sm font-medium text-gray-400">{product.price}</p> */}
          </div>
          <div className="bg-green-main w-full text-white py-2 text-center">
            View more
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="group relative py-4 border-b" key={product.id}>
        <Link href={`/products/${categorySlug}/${product.slug}`} passHref>
          <a title={product.name || ""} className="flex flex-col">
            <div className="font-bold text-gray-900 group-hover:text-blue-main text-xl">
              {product.name}
            </div>
            {product.shortDescription && (
              <div className="text-sm text-gray-500 pt-2">
                {parse(product.shortDescription)}
              </div>
            )}
            {/* <span className="text-sm font-medium text-gray-400">
              {product.price}
            </span> */}
          </a>
        </Link>
      </div>
    )
  }
}

export default ProductCard

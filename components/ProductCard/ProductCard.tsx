import Link from "next/link"

import type { Product } from "@api/codegen/graphql"
import useStore from "@lib/hooks/useStore"

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
  const viewMode = useStore((state) => state.shop.viewMode)

  const categorySlug = product.productCategories?.nodes
    ? product.productCategories.nodes[0]?.slug
    : ""

  if (viewMode === "grid") {
    return (
      <div className="group relative bg-white border border-gray-200 rounded w-full flex flex-col overflow-hidden">
        <div className="group-hover:opacity-75 transition-opacity">
          <div className="w-full object-center object-cover sm:w-full sm:h-full aspect-square relative overflow-hidden">
            {product.image && product.image.sourceUrl ? (
              <Image
                src={product.image.sourceUrl}
                alt={product.image.altText ?? ""}
                width={product.image.mediaDetails?.width ?? undefined}
                height={product.image.mediaDetails?.height ?? undefined}
                className="object-contain w-full h-full"
              />
            ) : (
              <div
                className="p-4 w-full text-sm max-h-[140px] line-clamp-[6] md:max-h-full md:line-clamp-none text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription ?? "",
                }}
              />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-2 flex flex-col w-full">
          <h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-accent transition-colors text-base sm:text-xl">
            <Link
              href={`/products/${categorySlug}/${product.slug}`}
              title={product.name ?? ""}
              className="flex flex-col"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <div className="px-4 pb-2 flex-1 flex flex-col justify-end"></div>
          <div className="bg-accent group-hover:bg-highlight transition-colors w-full text-white py-2 text-center">
            View details
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="group relative py-4" key={product.id}>
        <Link
          href={`/products/${categorySlug}/${product.slug}`}
          title={product.name ?? ""}
          className="flex items-center"
        >
          <div className="flex flex-col w-full">
            <p className="font-bold text-accent group-hover:text-highlight transition-colors text-xl">
              {product.name}
            </p>
            {product.shortDescription && (
              <p
                className="text-sm text-gray-500 pt-2"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}
          </div>
          {product.image?.sourceUrl && (
            <div className="w-16 lg:w-24 aspect-square rounded ml-4">
              <Image
                src={product.image.sourceUrl}
                alt={product.image.altText ?? ""}
                width={product.image.mediaDetails?.width ?? undefined}
                height={product.image.mediaDetails?.height ?? undefined}
                className="object-cover w-full aspect-square rounded"
              />
            </div>
          )}
        </Link>
      </div>
    )
  }
}

export default ProductCard

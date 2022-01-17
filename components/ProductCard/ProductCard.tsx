import Link from "next/link"
import {
  default as parse,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"

import { Product } from "@api/gql/types"

import { Image } from "@components"

type ProductCardProps = {
  product: Product & { price?: string }
  category_slug: string
  viewMode?: "grid" | "list"
}

const ProductCard = ({
  product,
  category_slug,
  viewMode = "grid",
}: ProductCardProps) => {
  if (viewMode === "grid") {
    return (
      <div
        key={product.id}
        className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
      >
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
        <div className="flex-1 p-4 space-y-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/products/${category_slug}/${product.slug}`} passHref>
              <a title={product.name || ""} className="flex flex-col">
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </Link>
          </h3>
          {product.shortDescription && (
            <div className="text-sm text-gray-500">
              {parse(product.shortDescription)}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-end">
            {/* <p className="text-sm italic text-gray-500">{product.options}</p> */}
            <p className="text-base font-medium text-gray-900">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="group relative" key={product.id}>
        <Link href={`/products/${category_slug}/${product.slug}`} passHref>
          <a title={product.name || ""} className="flex flex-col">
            <div className="font-bold text-gray-900 group-hover:text-blue-main text-xl">
              {product.name}
            </div>
            <div className=" text-gray-600 py-2">
              {parse(product.shortDescription || "")}
            </div>
            <span className="text-sm font-medium text-gray-400">
              {product.price}
            </span>
          </a>
        </Link>
      </div>
    )
  }
}

export default ProductCard

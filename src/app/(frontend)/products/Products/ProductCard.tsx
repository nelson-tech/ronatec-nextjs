import useStore from "@hooks/useStore"
import type { Product } from "~payload-types"

import Link from "@components/Link"
import PriceBadge from "@components/PriceBadge"
import Image from "@components/Image/Image"

// ####
// #### Types
// ####

type ProductCardProps = {
  product: Product
}

// ####
// #### Component
// ####

const ProductCard = ({ product }: ProductCardProps) => {
  const viewMode = useStore((state) => state.shop.viewMode)

  const categorySlug = product?.categories
    ? typeof product.categories[0] === "object"
      ? product.categories[0]?.slug
      : ""
    : ""

  const image = product.featuredImage
    ? typeof product.featuredImage === "object"
      ? product.featuredImage
      : null
    : null

  const wcImage =
    product?.wc?.images && (product.wc.images.length ?? 0) > 0
      ? product.wc?.images[0]
      : null

  if (viewMode === "grid") {
    return (
      <div className="group relative bg-white border border-gray-200 rounded w-full flex flex-col overflow-hidden">
        {/* <PriceBadge
          product={product}
          className="absolute top-2 right-2 z-[3] bg-highlight text-white rounded-full p-2 text-sm"
        /> */}
        <div className="group-hover:opacity-75 transition-opacity">
          <div className="w-full object-center object-cover aspect-square  flex items-center relative overflow-hidden">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt ?? ""}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                className="object-cover w-full h-full"
              />
            ) : wcImage?.src ? (
              <Image
                src={wcImage.src}
                alt={wcImage.alt ?? ""}
                width={1080}
                height={720}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="px-4 text-sm max-h-[140px] line-clamp-[6] md:line-clamp-[7] text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: product?.shortDescription ?? "",
                }}
              />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-2 flex flex-col w-full">
          <h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-accent transition-colors text-base sm:text-xl">
            <Link
              href={`/products/${categorySlug}/${product?.slug}`}
              title={product?.title ?? ""}
              className="flex flex-col"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              <span
                dangerouslySetInnerHTML={{ __html: product?.title ?? "" }}
              ></span>
            </Link>
          </h3>
          <div className="px-4 pb-2 flex-1 flex flex-col justify-end"></div>
          <div className="bg-accent h-10 group-hover:bg-highlight transition-colors w-full text-white py-2 relative duration-300">
            <span className="absolute left-0 top-0 w-full mt-2.5 transition-all text-center group-hover:opacity-0 duration-300 text-sm">
              {product?.prices?.formatted?.price || "View details"}
            </span>
            <span
              className="absolute left-0 top-0 w-full mt-2.5 transition-all text-center
             translate-y-10 group-hover:translate-y-0 duration-300 opacity-0 group-hover:opacity-100 text-sm"
            >
              View details
            </span>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="group relative py-4" key={product?.id}>
        <Link
          href={`/products/${categorySlug}/${product?.slug}`}
          title={product?.title ?? ""}
          className="flex items-center"
        >
          <div className="flex flex-col w-full">
            <p
              className="font-bold text-accent group-hover:text-highlight transition-colors text-xl"
              dangerouslySetInnerHTML={{ __html: product?.title ?? "" }}
            ></p>
            <div className="flex justify-between items-center">
              <div className="pt-2">
                {product?.shortDescription && (
                  <p
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription ?? "",
                    }}
                  />
                )}
              </div>

              <PriceBadge
                product={product}
                className=" bg-highlight text-white rounded-full p-2 text-sm"
              />
            </div>
          </div>
          {image?.url ? (
            <div className="w-16 lg:w-24 aspect-square rounded ml-4">
              <Image
                src={image.url}
                alt={image.alt ?? ""}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                className="object-cover w-full aspect-square rounded"
              />
            </div>
          ) : (
            wcImage && (
              <div className="w-16 lg:w-24 aspect-square rounded ml-4">
                <Image
                  src={wcImage.src ?? ""}
                  alt={wcImage.alt ?? ""}
                  width={200}
                  height={200}
                  className="object-cover w-full aspect-square rounded"
                />
              </div>
            )
          )}
        </Link>
      </div>
    )
  }
}

export default ProductCard

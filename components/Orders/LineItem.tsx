import { FullProduct } from "@lib/types/products"

import Image from "@components/Image"

// ####
// #### Types
// ####

type PropsType = {
  product: FullProduct
  quantity: number | null | undefined
}

// ####
// #### Component
// ####

const LineItem = ({ product, quantity }: PropsType) => {
  return (
    <>
      <tr key={product.id}>
        <td className="py-6 pr-8">
          <div className="flex items-center">
            {product.image && product.image.sourceUrl && (
              <div className="w-16 object-center object-cover rounded overflow-hidden mr-6">
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText ?? ""}
                  height={product.image.mediaDetails?.height ?? undefined}
                  width={product.image.mediaDetails?.width ?? undefined}
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{product.name}</div>
              {product.variations?.nodes &&
                product.variations?.nodes[0]?.attributes?.nodes && (
                  <div>
                    {product.variations?.nodes[0]?.attributes?.nodes[0]?.label}:{" "}
                    {product.variations?.nodes[0]?.name?.split(" - ")[1]}
                  </div>
                )}
              {/* <div className="mt-1 sm:hidden">{product.price}</div> */}
            </div>
          </div>
        </td>
        {/* <td className="hidden py-6 pr-8 sm:table-cell">
      {product.price}
    </td> */}
        <td className="py-6 pl-2.5 pr-8">
          <div className="hidden sm:table-cell">{quantity}</div>
          <div className="table-cell sm:hidden">
            <div className="w text-right">x{quantity}</div>
            {/* <div className="border-t">
          {"$" +
            (lineItem?.total &&
              numberWithCommas(lineItem?.total))}
        </div> */}
          </div>
        </td>
        {/* <td className="hidden py-6 pr-8 sm:table-cell">
      {"$" +
        (lineItem?.total && numberWithCommas(lineItem?.total))}
    </td> */}
        <td className="py-6 font-medium text-right whitespace-nowrap">
          <a
            href={`/products/${
              product.productCategories?.nodes &&
              product.productCategories.nodes[0]?.slug
            }/${product.slug}`}
            className="text-blue-main"
          >
            View
            <span className="hidden lg:inline"> Product</span>
            <span className="sr-only">, {product.name}</span>
          </a>
        </td>
      </tr>
    </>
  )
}

export default LineItem

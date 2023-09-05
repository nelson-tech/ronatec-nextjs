import { Category, Product } from "~payload-types"

import Image from "@components/Image"

// ####
// #### Types
// ####

type PropsType = {
  product: Product
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
            {typeof product.featuredImage === "object" && (
              <div className="w-16 object-center object-cover rounded overflow-hidden mr-6">
                <Image
                  src={product.featuredImage.url ?? ""}
                  alt={product.featuredImage.alt ?? ""}
                  height={product.featuredImage.height ?? undefined}
                  width={product.featuredImage.width ?? undefined}
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{product.title}</div>
              {product.variations && product.variations?.at(0)?.options && (
                <div>
                  {product.variations?.at(0)?.options?.at(0)?.label}:{" "}
                  {product.variations?.at(0)?.name?.split(" - ")[1]}
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
              typeof product.categories?.at(0) === "object" &&
              (product.categories?.at(0) as Category).slug
            }/${product.slug}`}
            className="text-blue-main"
          >
            View
            <span className="hidden lg:inline"> Product</span>
            <span className="sr-only">, {product.title}</span>
          </a>
        </td>
      </tr>
    </>
  )
}

export default LineItem

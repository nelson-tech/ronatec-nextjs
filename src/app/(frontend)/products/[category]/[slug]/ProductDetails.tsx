import ProductGallery from "./Gallery"
import type { Product } from "~payload-types"
import PriceBadge from "@components/PriceBadge/PriceBadge"
// import parse, { htmlParserOptions } from "@utils/htmlParser"
import AddToCartForm from "./AddToCartForm"
import ProductTabs from "./ProductTabs"

// ####
// #### Types
// ####

type DefaultProductProps = {
  product: Product
  children?: React.ReactNode
}

// ####
// #### Component
// ####

const ProductDetails = ({ product, children }: DefaultProductProps) => {
  // const getAttributes = (product: REST_WC_Product) => {
  //   let allAttributes: AttributeType[] = []

  //   product.variations?.nodes &&
  //     product.variations.nodes.map((variation: ProductVariation) => {
  //       if (variation) {
  //         const { attributes } = variation
  //         attributes?.nodes &&
  //           attributes.nodes.map((attribute: VariationAttribute) => {
  //             if (attribute && attribute.name) {
  //               if (!allAttributes.some((a) => a.name === attribute.label)) {
  //                 allAttributes.push({
  //                   name: attribute.label,
  //                   variations: [variation],
  //                   id: attribute.id,
  //                 })
  //               } else {
  //                 const attIndex = allAttributes.findIndex(
  //                   (a) => a.name === attribute.label
  //                 )
  //                 allAttributes[attIndex].variations.push(variation)
  //               }
  //             }
  //           })
  //       }
  //     })

  //   return allAttributes
  // }

  // const attributes = getAttributes(product)
  // const firstVariation =
  //   product?.variations && product.variations.length > 0
  //     ? product.variations[0].attributes[0]
  //     : null
  // const [selectedVariation, setSelectedVariation] =
  //   useState<REST_WC_ProductVariationAttribute | null>(firstVariation)

  // Update selected variation if firstVariation changes (reload or product change)
  // useEffect(() => {
  //   setSelectedVariation(firstVariation)
  // }, [firstVariation, setSelectedVariation])

  return (
    <>
      <div className="text-gray-700 w-full mx-auto lg:max-w-7xl object-contain">
        <h2
          className="text-2xl font-extrabold text-center hidden lg:block py-4 border-b px-4"
          dangerouslySetInnerHTML={{
            __html: product?.title ?? "",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
          <div
            id="image-and-options"
            className="w-full col-span-1 p-8 flex flex-col md:flex-row lg:flex-col md:justify-center lg:justify-start"
          >
            <ProductGallery
              images={product?.gallery?.map((imageData) =>
                typeof imageData.image === "object" ? imageData.image : null
              )}
              featuredImage={
                typeof product?.featuredImage === "object"
                  ? product?.featuredImage
                  : null
              }
              wcImages={product?.wc?.images}
            />

            <div
              id="product-options"
              className="w-full md:w-1/2 lg:w-full mx-auto pt-8 md:pt-0 lg:pt-8 h-full md:flex lg:block flex-col"
            >
              <h2
                className="text-2xl font-extrabold text-center"
                dangerouslySetInnerHTML={{
                  __html: product?.title ?? "",
                }}
              />
              <PriceBadge
                product={product}
                className="mt-4 font-bold border-t pt-4 text-gray-600"
              />
              <div
                className="prose mt-4"
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription ?? "",
                }}
              />
              <AddToCartForm product={product} />
            </div>
          </div>
          <div
            id="description-column"
            className="border-t lg:border-t-0 col-span-1 md:col-span-2 px-8 mb-8"
          >
            {/* {selectedVariation && (
              <div id="variation-description" className="py-4 mt-4 border-b">
                <>
                  <div className="flex items-center">
                    <div className="mr-4 text-xl font-extrabold uppercase">
                      Selected:
                    </div>
                    <div className="">
                      <span className="font-bold">
                        {selectedVariation.name?.split(" - ")[1]}
                      </span>
                      {selectedVariation.description &&
                        selectedVariation.description[0] !== "<" &&
                        ` - ${parse(selectedVariation.description)}`}
                    </div>
                  </div>
                </>
              </div>
            )} */}

            <div className="py-4">
              <ProductTabs product={product} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails

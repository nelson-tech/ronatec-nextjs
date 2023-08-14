"use client"

import { FormEventHandler, useState } from "react"

// import parse, { htmlParserOptions } from "@utils/htmlParser/options"

import LoadingSpinner from "@components/ui/LoadingSpinner"

import useStore from "@hooks/useStore"
import ProductGallery from "./Gallery"
// import Blocks from "~/components/Blocks"
import useCart from "@hooks/useCart"
import type { Image, Product } from "payload/generated-types"
import PriceBadge from "@components/PriceBadge/PriceBadge"
import getParsedPrice from "@utils/getParsedPrice"
import parse, { htmlParserOptions } from "@utils/htmlParser"

// ####
// #### Types
// ####

type DefaultProductProps = {
  product: Product | null
}

// ####
// #### Component
// ####

const ProductDetails = ({ product }: DefaultProductProps) => {
  const { cart, loading, setLoading } = useStore((stores) => ({
    cart: stores.cart.state,
    loading: stores.cart.loading,
    setLoading: stores.cart.setLoading,
  }))

  const { addCartItems } = useCart()
  // const { count } = useStore((stores) => ({ count: stores.cart.state?.count }))
  const setAlert = useStore((state) => state.alert.setAlert)

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

  const [error, setError] = useState<string | null>(null)

  const inCart = cart?.items
    ?.map((item) =>
      typeof item.product === "object" ? item.product.id : item.product
    )
    .includes(product?.id ?? "")

  // Update selected variation if firstVariation changes (reload or product change)
  // useEffect(() => {
  //   setSelectedVariation(firstVariation)
  // }, [firstVariation, setSelectedVariation])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    console.log("Product page adding")
    event.preventDefault()
    setError(null)

    if (product?.id) {
      let input = {
        product: product.id,
        title: product.title,
        price: getParsedPrice({ product }),
        quantity: 1,
      }
      setLoading(true)

      await addCartItems([input])
    } else {
      setAlert({ open: true, kind: "error", primary: "Product ID not found." })
    }
  }

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
              className="w-full md:w-1/2 lg:w-full mx-auto pt-8 md:pt-0 lg:pt-8 h-full md:flex lg:block flex-col justify-center"
            >
              <h2
                className="text-2xl font-extrabold text-center"
                dangerouslySetInnerHTML={{
                  __html: product?.title ?? "",
                }}
              />
              <PriceBadge product={product} className="mt-4 text-center " />

              <form className="" onSubmit={handleSubmit}>
                {/* {product?.has_options &&
                  product.attributes &&
                  product.attributes.map((attribute) => {
                    return (
                      <RadioGroup
                        value={selectedVariation}
                        onChange={setSelectedVariation}
                        className="mt-4 pt-8"
                        key={attribute.id}
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a variation
                        </RadioGroup.Label>
                        <div
                          key={attribute.id}
                          className="text-base font-bold pb-3"
                        >
                          {attribute.name}:
                        </div>
                        <div className="flex flex-wrap items-center justify-center space-x-4">
                          {attribute.terms.map((variation) => {
                            if (variation) {
                              return (
                                <RadioGroup.Option
                                  key={variation.name}
                                  value={variation}
                                  className={({ checked }) =>
                                    `transition-all group 
                              ${
                                checked
                                  ? "bg-accent text-white "
                                  : "bg-white hover:bg-highlight"
                              }
                                relative rounded border shadow-sm border-opacity-80 px-5 py-4 mb-4 cursor-pointer flex outline-none`
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className="flex items-center justify-between w-full outline-none">
                                        <div className="flex items-center outline-none">
                                          <div className="text-sm outline-none">
                                            <RadioGroup.Label
                                              as="p"
                                              className={`font-medium ring-transparent transition-colors ${
                                                checked
                                                  ? "text-white"
                                                  : "text-gray-900 group-hover:text-white"
                                              }`}
                                            >
                                              {variation.name}
                                            </RadioGroup.Label>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              )
                            }
                          })}
                        </div>
                      </RadioGroup>
                    )
                  })} */}
                {error && (
                  <div className="my-4 text-sm text-red-600">
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className={`mt-8 relative w-full ${
                    inCart ? "bg-gray-500" : "bg-accent"
                  } rounded py-3 px-8 flex items-center 
                  justify-center ${
                    inCart ? "" : "hover:bg-highlight"
                  } focus:outline-none focus:ring-0 transition-colors`}
                  disabled={loading || inCart}
                >
                  {loading ? (
                    <span>
                      <LoadingSpinner size={6} color="white" opacity={75} />
                    </span>
                  ) : (
                    <span className="text-base font-medium text-white">
                      {inCart ? "Item in cart" : "Add to cart"}
                    </span>
                  )}
                </button>
              </form>
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
            {product?.description ||
              (product?.wc?.description && (
                <div
                  id="product-description"
                  className="prose max-w-none mt-8 [&>p>iframe]:w-full"
                  // dangerouslySetInnerHTML={{
                  //   __html: product?.description ?? product?.wc?.description,
                  // }}
                >
                  {/* <Blocks blocks={product.layout} /> */}
                  {parse(
                    product?.description ?? product?.wc?.description,
                    htmlParserOptions
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails

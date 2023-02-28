"use client"

import { FormEventHandler, useEffect, useState } from "react"
import { RadioGroup, Tab } from "@headlessui/react"

import {
  AddToCartInput,
  MediaItem,
  ProductAttributeInput,
  ProductVariation,
  VariationAttribute,
} from "@api/codegen/graphql"
import useCart from "@lib/hooks/useCart"
import { htmlParserOptions, parse } from "@lib/utils"
import isServer from "@lib/utils/isServer"
import { AttributeType, FullProduct } from "@lib/types/products"

import Image from "@components/Image"
import LoadingSpinner from "@components/ui/LoadingSpinner"

import "./style.css"
import classs from "@lib/utils/classs"
import useStore from "@lib/hooks/useStore"

// ####
// #### Types
// ####

type DefaultProductProps = {
  product: FullProduct
}

// ####
// #### Component
// ####

const DefaultProduct = ({ product }: DefaultProductProps) => {
  const { loading, addToCart } = useCart()
  const setAlert = useStore((state) => state.alert.setAlert)

  const getAttributes = (product: FullProduct) => {
    let allAttributes: AttributeType[] = []

    product.variations?.nodes &&
      product.variations.nodes.map((variation: ProductVariation) => {
        if (variation) {
          const { attributes } = variation
          attributes?.nodes &&
            attributes.nodes.map((attribute: VariationAttribute) => {
              if (attribute && attribute.name) {
                if (!allAttributes.some((a) => a.name === attribute.label)) {
                  allAttributes.push({
                    name: attribute.label,
                    variations: [variation],
                    id: attribute.id,
                  })
                } else {
                  const attIndex = allAttributes.findIndex(
                    (a) => a.name === attribute.label
                  )
                  allAttributes[attIndex].variations.push(variation)
                }
              }
            })
        }
      })

    return allAttributes
  }

  const attributes = getAttributes(product)

  const firstVariation =
    attributes && attributes?.length > 0 ? attributes[0].variations[0] : null
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(firstVariation)

  const [error, setError] = useState<string | null>(null)

  // Update selected variation if firstVariation changes (reload or product change)
  useEffect(() => {
    setSelectedVariation(firstVariation)
  }, [firstVariation, setSelectedVariation])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setError(null)

    const { databaseId: productId } = product
    if (productId) {
      let input: AddToCartInput = {
        productId,
        quantity: 1,
      }

      if (product.type === "VARIABLE" && selectedVariation) {
        const attributes = selectedVariation.attributes?.nodes
        if (attributes && attributes) {
          const variation: ProductAttributeInput[] = attributes.map(
            (attribute: VariationAttribute) => {
              return {
                attributeName: attribute?.name ?? "",
                attributeValue: attribute?.value ?? "",
              }
            }
          )
          input.variationId = selectedVariation.databaseId
          input.variation = variation
        }
      }

      await addToCart({ input })
    } else {
      setAlert({ open: true, kind: "error", primary: "Product ID not found." })
    }
  }

  const images = [
    product?.image,
    ...(product?.galleryImages?.nodes ?? []),
  ] as MediaItem[]

  return (
    <>
      <div className="text-gray-700 w-full mx-auto lg:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
          <div
            id="image-and-options"
            className="w-full col-span-1 p-8 flex flex-col md:flex-row lg:flex-col md:justify-center lg:justify-start"
          >
            {product.image?.sourceUrl && (
              <div
                id="product-image"
                className="w-full md:w-1/2 lg:w-full md:px-4 lg:px-0 flex justify-center"
              >
                {/* <!-- Image Gallery --> */}
                {images &&
                  (images.length > 1 ? (
                    <Tab.Group as="div" className="flex flex-col items-center">
                      <Tab.Panels
                        className="object-contain w-full relative"
                        as="div"
                      >
                        {images.map(
                          (image, i) =>
                            image.sourceUrl && (
                              <Tab.Panel key={image.id + "main"}>
                                <Image
                                  src={image.sourceUrl}
                                  alt={image.altText ?? ""}
                                  width={image.mediaDetails?.width ?? 0}
                                  height={image.mediaDetails?.height ?? 0}
                                  className="rounded"
                                />
                              </Tab.Panel>
                            )
                        )}
                      </Tab.Panels>

                      {/* <!-- Image selector --> */}
                      <div className="mx-auto w-full mt-4 px-4 lg:px-0 max-w-2xl sm:block lg:max-w-none">
                        <Tab.List className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-6 lg:gap-4">
                          {images.map(
                            (image) =>
                              image.sourceUrl && (
                                <Tab
                                  key={image.id + "thumbs"}
                                  className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-sm
                                  focus:outline-none focus:ring focus:ring-accent focus:ring-offset-4"
                                >
                                  <span className="sr-only">
                                    {image.altText}
                                  </span>
                                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                                    <Image
                                      src={image.sourceUrl}
                                      alt={image.altText ?? ""}
                                      fill
                                      sizes="33vw"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </span>
                                  <span
                                    className={classs(
                                      "ring-transparent",
                                      "pointer-events-none absolute inset-0 rounded ring-2 ring-offset-2"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Tab>
                              )
                          )}
                        </Tab.List>
                      </div>
                    </Tab.Group>
                  ) : (
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.image.altText ?? ""}
                      height={product.image?.mediaDetails?.height ?? undefined}
                      width={product.image?.mediaDetails?.width ?? undefined}
                      className="object-contain rounded overflow-hidden"
                      priority
                    />
                  ))}
              </div>
            )}
            <div
              id="product-options"
              className="w-full md:w-1/2 lg:w-full mx-auto pt-8 md:pt-0 lg:pt-8 h-full md:flex lg:block flex-col justify-center"
            >
              <h2 className="text-2xl font-extrabold text-center">
                {product.name}
              </h2>

              <form className="" onSubmit={handleSubmit}>
                {attributes &&
                  attributes.map((attribute) => {
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
                          {attribute.variations.map((variation) => {
                            if (variation) {
                              return (
                                <RadioGroup.Option
                                  key={variation.sku}
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
                                              {
                                                variation.name?.split(
                                                  product.name + " - "
                                                )[1]
                                              }
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
                  })}
                {error && (
                  <div className="my-4 text-sm text-red-600">
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="mt-8 relative w-full bg-accent rounded py-3 px-8 flex items-center 
                  justify-center hover:bg-highlight focus:outline-none focus:ring-0 transition-colors"
                >
                  {loading ? (
                    <span>
                      <LoadingSpinner size={6} color="white" opacity={75} />
                    </span>
                  ) : (
                    <span className="text-base font-medium text-white">
                      Add to cart
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
            {selectedVariation && (
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
            )}
            <div
              id="product-description"
              className="mt-4 prose prose-slate
                prose-a:text-highlight hover:prose-a:text-accent prose-a:transition-all
                prose-headings:border-t prose-headings:pt-2
                prose-p:pt-4
                max-w-none"
            >
              {product.description &&
                parse(product.description, htmlParserOptions)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultProduct

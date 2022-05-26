import { FormEventHandler, useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import PlusIcon from "@heroicons/react/solid/PlusIcon"
import MinusIcon from "@heroicons/react/solid/MinusIcon"
import CheckIcon from "@heroicons/react/solid/CheckIcon"

import useCart from "@lib/hooks/useCart"
import { htmlParserOptions, isServer, parse } from "@lib/utils"
import { AttributeType, FullProduct } from "@lib/types"
import {
  AddToCartInput,
  ProductAttributeInput,
  ProductVariation,
} from "@api/gql/types"

import Image from "@components/Image"
import LoadingSpinner from "@components/ui/LoadingSpinner"

import {
  Container,
  ProductMainContainer,
  ProductTopContainer,
  TopContainer,
} from "./style"

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
  const { addToCart } = useCart()

  const getAttributes = (product: FullProduct) => {
    let allAttributes: AttributeType[] = []

    product.variations?.nodes &&
      product.variations.nodes.map(variation => {
        if (variation) {
          const { attributes } = variation as ProductVariation
          attributes?.nodes &&
            attributes.nodes.map(attribute => {
              if (attribute && attribute.name) {
                if (!allAttributes.some(a => a.name === attribute.label)) {
                  allAttributes.push({
                    name: attribute.label,
                    variations: [variation],
                    id: attribute.id,
                  })
                } else {
                  const attIndex = allAttributes.findIndex(
                    a => a.name === attribute.label,
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
  const [addLoading, setAddLoading] = useState(false)
  const [itemAdded, setItemAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (itemAdded) {
      setTimeout(() => {
        setItemAdded(false)
      }, 2000)
    }
  })

  // Update selected variation if firstVariation changes (reload or product change)
  useEffect(() => {
    setSelectedVariation(firstVariation)
  }, [firstVariation, setSelectedVariation])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    setAddLoading(true)
    event.preventDefault()
    setError(null)

    const { databaseId: productId } = product
    if (productId) {
      let input: AddToCartInput = {
        productId,
        quantity,
      }

      if (product.type === "VARIABLE" && selectedVariation) {
        const attributes = selectedVariation.attributes?.nodes
        if (attributes && attributes) {
          const variation: ProductAttributeInput[] = attributes.map(
            attribute => {
              return {
                attributeName: attribute?.name || "",
                attributeValue: attribute?.value || "",
              }
            },
          )
          input.variationId = selectedVariation.databaseId
          input.variation = variation
        }
      }

      const { data, error } = await addToCart(input)

      if (data) {
        setItemAdded(true)
        if (!isServer) {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        setAddLoading(false)
      } else {
        setError(
          "Error adding to the shopping cart. Please try refreshing the page.",
        )
        setAddLoading(false)
      }

      if (error) {
        console.warn("ERROR", error)

        setError(error.message)
      }
    } else {
      setError("Product ID not found.")
      setAddLoading(false)
    }
  }

  return (
    <>
      <Container>
        <TopContainer>
          <div className="w-full">
            {product.image?.sourceUrl && (
              <Image
                src={product.image.sourceUrl}
                alt={product.image.altText || ""}
                layout="responsive"
                objectFit="contain"
                height={product.image?.mediaDetails?.height}
                width={product.image?.mediaDetails?.width}
                rounded="lg"
                priority
              />
            )}
          </div>
          <ProductTopContainer>
            <h2 className="text-2xl font-extrabold">{product.name}</h2>
            {/* <div className="py-4">
              <span>{product.price}</span>
            </div> */}
            <form className="" onSubmit={handleSubmit}>
              {attributes &&
                attributes.map(attribute => {
                  return (
                    <RadioGroup
                      value={selectedVariation}
                      onChange={setSelectedVariation}
                      className="mt-4"
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
                        {attribute.variations.map(variation => {
                          if (variation) {
                            return (
                              <RadioGroup.Option
                                key={variation.sku}
                                value={variation}
                                className={({ active, checked }) =>
                                  `${""}
                              ${
                                checked ? "bg-blue-main text-white" : "bg-white"
                              }
                                relative rounded-lg shadow-md px-5 py-4 mb-4 cursor-pointer flex outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex items-center justify-between w-full outline-none">
                                      <div className="flex items-center outline-none">
                                        <div className="text-sm outline-none">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium ring-transparent  ${
                                              checked
                                                ? "text-white"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {
                                              variation.name?.split(
                                                product.name + " - ",
                                              )[1]
                                            }
                                          </RadioGroup.Label>
                                          {/* <RadioGroup.Description
                                            as="span"
                                            className={`inline focus:ring-transparent ${
                                              checked
                                                ? "text-sky-100"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <span>{variation.price}</span>
                                          </RadioGroup.Description> */}
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
              <div className="mt-8 flex items-center">
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="pr-4">
                    Quantity:{" "}
                  </label>
                  <MinusIcon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setQuantity(quantity - 1)}
                  />
                  <input
                    className="w-16 text-center border py-1 text-sm rounded outline-none focus:bg-white ring-transparent"
                    value={quantity}
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    onChange={e => {
                      if (Number(e.target.value)) {
                        setQuantity(Number(e.target.value))
                      }
                    }}
                  />
                  <PlusIcon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 relative w-full bg-blue-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center hover:bg-blue-dark focus:outline-none focus:ring-0"
              >
                {itemAdded ? (
                  <CheckIcon className="w-6 h-6 text-green-main" />
                ) : addLoading ? (
                  <span>
                    <LoadingSpinner size={6} color="white" opacity={75} />
                  </span>
                ) : (
                  <span className="text-base font-medium text-white">
                    Add to cart
                  </span>
                )}
                {/* {itemAdded && (
                  <div className="absolute left-1/2 ml-16 text-green-main">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                )} */}
              </button>
            </form>
            {/* <button
              type="submit"
              onClick={handleCheckout}
              className="mt-8 w-full bg-green-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
            >
              Add & Checkout
            </button> */}
          </ProductTopContainer>
        </TopContainer>
        <ProductMainContainer>
          {selectedVariation && (
            <>
              <div className="flex border-t">
                <div className="mr-4 text-xl font-extrabold uppercase">
                  Selected:
                </div>
                <div className="mt-1">
                  <span className="font-bold">
                    {selectedVariation.name?.split(" - ")[1]}
                  </span>
                  {selectedVariation.description &&
                    selectedVariation.description[0] !== "<" &&
                    ` - ${parse(selectedVariation.description)}`}
                </div>
              </div>
              {selectedVariation.description &&
                selectedVariation.description[0] === "<" &&
                parse(selectedVariation.description)}
            </>
          )}
          <div className="border-t">
            <div className="mt-4">
              {product.description &&
                parse(product.description, htmlParserOptions)}
            </div>
          </div>
        </ProductMainContainer>
      </Container>
    </>
  )
}

export default DefaultProduct

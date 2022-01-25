import { FormEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { RadioGroup } from "@headlessui/react"
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid"

import { useAlert, useAuth } from "@lib/hooks"
import {
  AddToCartInput,
  ProductAttributeInput,
  ProductVariation,
} from "@api/gql/types"
import { AttributeType, FullProduct } from "@lib/types"

import { Image } from "@components"
import {
  Container,
  ProductMainContainer,
  ProductTopContainer,
  TopContainer,
} from "./style"
import { LoadingDots } from "@components/ui"
import ScrollArrow from "@components/ui/ScrollArrow/ScrollArrow"
import { htmlParserOptions, isServer, parse } from "@lib/utils"

type DefaultProductProps = {
  product: FullProduct
  attributes: AttributeType[] | null
}

const DefaultProduct = ({ product, attributes }: DefaultProductProps) => {
  const router = useRouter()
  const apolloClient = useApolloClient()

  const { getClientMutationId, getClientShopId } = useAuth()

  const { showAlert } = useAlert()

  const firstVariation =
    attributes && attributes?.length > 0 ? attributes[0].variations[0] : null
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(firstVariation)

  const [error, setError] = useState<string | null>(null)
  const [addLoading, setAddLoading] = useState(false)
  const [itemAdded, setItemAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    if (itemAdded) {
      setTimeout(() => {
        setItemAdded(false)
      }, 2000)
    }
  })

  const ADD_MUTATION = gql`
    mutation addCart($input: AddToCartInput!) {
      addToCart(input: $input) {
        cart {
          isEmpty: contents {
            itemCount
            productCount
            edges {
              node {
                extraData {
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  `

  const [addToCartMutation] = useMutation(ADD_MUTATION, { errorPolicy: "all" })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    setAddLoading(true)
    event.preventDefault()
    setError(null)

    const { databaseId: productId } = product
    if (productId) {
      let input: AddToCartInput = {
        clientMutationId: getClientMutationId(),
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

      await addToCartMutation({
        variables: { input },
        onCompleted(res) {
          const { addToCart } = res

          if (addToCart && addToCart.cart) {
            apolloClient.refetchQueries({ include: ["CartQuery"] }).then(r => {
              if (!isServer) {
                window.scrollTo({ top: 0, behavior: "smooth" })
                // showAlert({
                //   open: true,
                //   primary: "Success",
                //   secondary: "Product has been added to the cart.",
                //   type: "info",
                // })
              }
              setItemAdded(true)
              setAddLoading(false)
            })
          } else {
            setError("Error adding to the shopping cart.")
            setAddLoading(false)
          }
        },
        onError(error) {
          console.log("ERROR", error)

          setError(error.message)
        },
      })
    } else {
      setError("Product ID not found.")
      setAddLoading(false)
    }
  }

  const handleCheckout = () => {
    const clientShopId = getClientShopId()
    if (clientShopId) {
      router.push(
        `${process.env.NEXT_PUBLIC_API_CHECKOUT_BASE_URL}?session_id=${clientShopId}`,
      )
    } else {
      setError("Shopping Session not found.")
    }
  }

  return (
    <>
      <ScrollArrow />
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
              />
            )}
          </div>
          <ProductTopContainer>
            <h2 className="text-2xl font-extrabold">{product.name}</h2>
            <div className="py-4">
              <span>{product.price}</span>
            </div>
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
                      <div key={attribute.id} className="text-base font-bold">
                        {attribute.name}
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
                                            {variation.description}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className={`inline focus:ring-transparent ${
                                              checked
                                                ? "text-sky-100"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <span>{variation.price}</span>
                                          </RadioGroup.Description>
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
                <div className="pr-4">Quantity: </div>
                <form>
                  <div className="flex items-center space-x-2">
                    <MinusIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setQuantity(quantity - 1)}
                    />
                    <input
                      className="w-16 text-center border py-1 text-sm rounded outline-none focus:bg-white ring-transparent"
                      value={quantity}
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
                </form>
              </div>
              <button
                type="submit"
                className="mt-8 relative w-full bg-blue-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
              >
                {addLoading && (
                  <div className="h-6 w-6 absolute left-0 ml-4">
                    <LoadingDots color="white" />
                  </div>
                )}
                <span>Add to cart</span>
                {itemAdded && (
                  <div className="absolute left-1/2 ml-16 text-green-main">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                )}
              </button>
            </form>
            <button
              type="submit"
              onClick={handleCheckout}
              className="mt-8 w-full bg-green-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
            >
              Add & Checkout
            </button>
          </ProductTopContainer>
        </TopContainer>
        <ProductMainContainer>
          {product.description && parse(product.description, htmlParserOptions)}
        </ProductMainContainer>
      </Container>
    </>
  )
}

export default DefaultProduct

import { FormEventHandler, useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/solid"
import { v4 as uuid } from "uuid"

import {
  AddToCartInput,
  Cart,
  ExternalProduct,
  GroupProduct,
  Product,
  ProductAttributeInput,
  ProductVariation,
  SimpleProduct,
  VariableProduct,
} from "@api/gql/types"

import { HTML, Image } from "@components"
import {
  Container,
  ProductMainContainer,
  ProductTopContainer,
  TopContainer,
} from "./style"
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import jwtDecode from "jwt-decode"
import { getSessionToken } from "@lib/apollo/auth"

type Props = {
  product: Product &
    VariableProduct &
    SimpleProduct &
    GroupProduct &
    ExternalProduct
}

const DefaultProduct = ({ product }: Props) => {
  const router = useRouter()
  const apolloClient = useApolloClient()

  const firstVariation =
    product.variations?.nodes && product.variations?.nodes[0]
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(firstVariation || null)

  const [error, setError] = useState<string | null>(null)
  const [cart, setCart] = useState<Cart | null>(null)

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

  const [addToCartMutation, { data, error: mutationError, loading }] =
    useMutation(ADD_MUTATION, { errorPolicy: "all" })

  const getCartQuery = gql`
    query MyQuery {
      cart {
        contentsTotal
        isEmpty
        total
        contents {
          nodes {
            subtotal
            quantity
            product {
              node {
                name
                sku
              }
            }
          }
          itemCount
        }
      }
    }
  `

  const { data: cartData, error: queryError } = useQuery(getCartQuery)

  useEffect(() => {
    if (mutationError) {
      setError(mutationError.message)
    }
  }, [mutationError])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setError(null)

    const { databaseId: productId } = product
    if (productId && selectedVariation) {
      let input: AddToCartInput = {
        clientMutationId: uuid(),
        productId,
        quantity: 1,
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

      console.log(input)

      console.log(getSessionToken())

      await addToCartMutation({ variables: { input } }).then(response => {
        console.log(response)
        const { data } = response
        if (data && data.addToCart && data.addToCart.cart) {
          setCart(data.addToCart.cart)
          apolloClient.refetchQueries({ include: ["CartQuery"] })
          console.log("SETTING CART")
        }
      })
      return
    }
    setError("Product ID not found.")
  }

  const handleCheckout = () => {
    const sessionToken = getSessionToken()
    if (sessionToken) {
      const session =
        jwtDecode<{ data: { customer_id: string } }>(sessionToken).data
          .customer_id
      router.push(`https://api.ronatec.us/checkout?session_id=${session}`)
    } else {
      setError("Shopping Session not found.")
    }
  }

  useEffect(() => {
    cartData && setCart(cartData.cart)
  }, [cartData])

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
              />
            )}
          </div>
          <ProductTopContainer>
            <h2 className="text-2xl font-extrabold">{product.name}</h2>
            <div className="py-4">
              <span>{product.price}</span>
            </div>
            <form className="" onSubmit={handleSubmit}>
              {firstVariation && (
                <RadioGroup
                  value={selectedVariation}
                  onChange={setSelectedVariation}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a variation
                  </RadioGroup.Label>
                  <div className="flex flex-wrap items-center justify-center space-x-4">
                    {product.variations?.nodes?.map(variation => {
                      if (variation) {
                        return (
                          <RadioGroup.Option
                            key={variation.sku}
                            value={variation}
                            className={({ active, checked }) =>
                              `${""}
                  ${checked ? "bg-blue-main text-white" : "bg-white"}
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
                                  {checked && (
                                    <div className="flex-shrink-0 text-white">
                                      <CheckIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        )
                      }
                    })}
                  </div>
                </RadioGroup>
              )}
              {error && (
                <div className="my-4 text-sm text-red-600">
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                className="mt-8 w-full bg-blue-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
              >
                Add to cart
              </button>
            </form>
            <button
              type="submit"
              onClick={handleCheckout}
              className="mt-8 w-full bg-blue-main border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
            >
              Add & Checkout
            </button>
          </ProductTopContainer>
        </TopContainer>
        <ProductMainContainer>
          <HTML html={product.description} />
        </ProductMainContainer>
      </Container>
    </>
  )
}

export default DefaultProduct

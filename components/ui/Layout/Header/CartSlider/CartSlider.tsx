import { Dispatch, Fragment, SetStateAction } from "react"
import router from "next/router"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { Dialog, Transition } from "@headlessui/react"
import { ArrowRightIcon, XIcon } from "@heroicons/react/outline"

import { Cart } from "@api/gql/types"

import { Image } from "@components"
import { CartPane } from "./style"
import { MenuLink } from "@components/ui"
import { useAuth } from "@lib/hooks"

type CartProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  cart: Cart | null | undefined
}

const clearCart = gql`
  mutation ClearCart($input: EmptyCartInput!) {
    emptyCart(input: $input) {
      clientMutationId
    }
  }
`

const removeItem = gql`
  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      clientMutationId
    }
  }
`

const CartSlider = ({ open, setOpen, cart }: CartProps) => {
  const [clearCartMutation] = useMutation(clearCart)
  const [removeItemMutation] = useMutation(removeItem)
  const apolloClient = useApolloClient()

  const { getClientShopId } = useAuth()

  const handleCheckout = () => {
    const clientShopId = getClientShopId()
    if (clientShopId) {
      console.log("ClientShopId", clientShopId)

      router.push(
        `${process.env.NEXT_PUBLIC_API_CHECKOUT_BASE_URL}?session_id=${clientShopId}`,
      )
    } else {
      setError("Shopping Session not found.")
    }
  }

  const handleRemoveItem = async (key: string) => {
    const input = {
      keys: [key],
    }
    await removeItemMutation({
      variables: { input },
      onCompleted(res) {
        if (res.removeItemsFromCart) {
          apolloClient.refetchQueries({ include: ["CartQuery"] })
        } else if (res.error) {
          console.log(res.errors)
        }
      },
      onError({ message }) {
        console.log("REMOVE ERROR", message)
      },
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-40"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <CartPane>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-extrabold text-gray-900">
                        Shopping Cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-red-main outline-none ring-transparent"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 h-full">
                      <div className="flow-root h-full">
                        {cart?.contents?.nodes &&
                        cart.contents.nodes?.length > 0 ? (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart?.contents?.nodes &&
                              cart?.contents?.nodes.map(lineItem => {
                                const product = lineItem?.product?.node
                                if (product) {
                                  const category =
                                    (product.productCategories?.nodes &&
                                      product.productCategories.nodes[0]
                                        ?.slug) ||
                                    ""
                                  return (
                                    <li
                                      key={product.id}
                                      className="py-6 flex items-center"
                                    >
                                      {product.image && (
                                        <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden">
                                          <Image
                                            src={product.image.sourceUrl || ""}
                                            alt={product.image.altText || ""}
                                            layout="responsive"
                                            objectFit="cover"
                                            width={
                                              product.image.mediaDetails?.width
                                            }
                                            height={
                                              product.image.mediaDetails?.height
                                            }
                                          />
                                        </div>
                                      )}

                                      <div className="ml-4 flex-1 flex flex-col mb-1">
                                        <div className="flex justify-between items-center ">
                                          <h3 onClick={() => setOpen(false)}>
                                            <MenuLink
                                              href={`/products/${category}/${product.slug}`}
                                              className="font-bold text-sm text-gray-900"
                                            >
                                              {product.name}
                                            </MenuLink>
                                          </h3>
                                          <p className="ml-4 text-xs text-gray-500">
                                            {lineItem.subtotal}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {lineItem.variation?.attributes
                                            ?.map(
                                              attribute =>
                                                `${attribute?.label} - ${attribute?.value}`,
                                            )
                                            .join(" - ")}
                                        </p>

                                        <div className="flex-1 flex items-end justify-between text-sm mt-1">
                                          <p className="text-gray-500">
                                            Qty {lineItem.quantity}
                                          </p>
                                          <div className="flex">
                                            <button
                                              type="button"
                                              className="font-medium text-blue-main hover:text-red-600"
                                              onClick={() =>
                                                handleRemoveItem(lineItem.key)
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                }
                              })}
                          </ul>
                        ) : (
                          <div className="text-gray-600 h-full">
                            <div className=" font-bold">
                              Your cart is empty...
                            </div>
                            <div className="mt-8 h-full">
                              <MenuLink
                                href="/products"
                                className="text-gray-800 h-full transition hover:text-green-main font-bold flex justify-center items-center"
                                onClick={() => setOpen(false)}
                              >
                                Visit our shop!
                                <ArrowRightIcon className="h-4 w-4 text-green-main ml-2" />
                              </MenuLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{cart?.subtotal}</p>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-main hover:bg-green-main"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <button
                        type="button"
                        className="text-red-600 font-medium hover:text-green-main"
                        onClick={() =>
                          clearCartMutation({
                            variables: { input: { clearPersistentCart: true } },
                            onCompleted(data) {
                              console.log("CLEARED DATA:", data)
                              apolloClient.refetchQueries({
                                include: ["CartQuery"],
                              })
                              setOpen(false)
                            },
                            onError(e) {
                              console.log("CLEARED ERROR:", e.graphQLErrors)
                            },
                          })
                        }
                      >
                        Clear Cart &nbsp;
                      </button>
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="text-blue-main font-medium hover:text-green-main"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </CartPane>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartSlider
function setError(arg0: string) {
  throw new Error("Function not implemented.")
}

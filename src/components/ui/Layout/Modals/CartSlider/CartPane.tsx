import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon"
import XIcon from "@heroicons/react/20/solid/XMarkIcon"

import useCart from "@hooks/useCart"
import useStore from "@hooks/useStore"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import Link from "@components/Link"
import CartItem from "./CartItem"

// import { StyledCartPane } from "./style"

// ####
// #### Component
// ####

const CartPane = () => {
  const { cart, setOpen, setLoading } = useStore((state) => ({
    cart: state.cart.state,
    setOpen: state.cart.setOpen,
    setLoading: state.cart.setLoading,
  }))

  const { removeItem, clearCart } = useCart()

  const handleClearCart = async () => {
    setLoading(true)
    await clearCart()
    // TODO - Handle error case
    setLoading(false)
  }

  return (
    <>
      <div className="fixed inset-y-0 right-0 max-w-[350px] sm:max-w-lg md:max-w-full flex">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="w-screen max-w-md relative">
            {false && (
              <div className="absolute z-40 w-full h-full items-center justify-center flex bg-black bg-opacity-10 transition">
                <LoadingSpinner className="h-24" />
              </div>
            )}
            <div className="flex flex-col justify-between h-full rounded-l bg-white shadow-xl overflow-y-scroll">
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

                <div className="mt-8 ">
                  <div className="h-full">
                    {cart?.items && cart.items.length > 0 ? (
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.items.map((lineItem) => (
                          <CartItem
                            key={lineItem?.id}
                            lineItem={lineItem}
                            setOpen={setOpen}
                            removeFromCart={removeItem}
                            setCartLoading={setLoading}
                          />
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 h-full">
                        <div className=" font-bold">Your cart is empty...</div>
                        <div className="mt-8 h-full">
                          <Link
                            href="/products"
                            className="text-gray-800 h-full transition hover:text-accent font-bold flex justify-center items-center"
                            onClick={() => setOpen(false)}
                          >
                            Visit our shop!
                            <ArrowRightIcon className="h-4 w-4 text-accent ml-2" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`border-t border-gray-200 py-6 px-4 sm:px-6${
                  (cart?.count ?? 0) === 0 && " hidden"
                }`}
              >
                {cart?.totals?.formatted?.subTotal !== "$0.00" && (
                  <div className="flex justify-between text-base font-medium text-gray-500">
                    <p>Subtotal</p>
                    <p>{cart?.totals?.formatted?.subTotal}</p>
                  </div>
                )}
                <div className="mt-2">
                  <Link
                    href="/checkout"
                    title="Checkout"
                    onClick={() => setOpen(false)}
                    className="flex w-full justify-center items-center px-6 py-3 border border-transparent
                    rounded shadow-sm text-base font-medium text-white bg-accent hover:bg-highlight transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <button
                    type="button"
                    className="text-red-600 font-medium hover:text-highlight transition-colors"
                    onClick={handleClearCart}
                  >
                    Clear Cart &nbsp;
                  </button>
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="text-accent font-medium hover:text-highlight transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </>
  )
}

export default CartPane
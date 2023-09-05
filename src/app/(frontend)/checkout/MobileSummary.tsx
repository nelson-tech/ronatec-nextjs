import { Disclosure, Popover, Transition } from "@headlessui/react"

import useStore from "@hooks/useStore"

import CartSummary from "./CartSummary"
import { ChevronUpIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"

// ####
// #### Types
// ####

type PropsType = {
  discounts?: boolean
}

// ####
// #### Component
// ####

const MobileSummary = ({ discounts }: PropsType) => {
  const cart = useStore((state) => state.cart.state)

  return (
    <>
      <section
        aria-labelledby="order-heading"
        className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
      >
        <Disclosure as="div" defaultOpen className="max-w-lg mx-auto">
          {({ open }) => (
            <>
              <div className="flex items-center justify-between">
                <h2
                  id="order-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Your Order
                </h2>
                <Disclosure.Button className="font-medium text-blue-main hover:text-highlight">
                  {open ? (
                    <span>Hide full summary</span>
                  ) : (
                    <span>Show full summary</span>
                  )}
                </Disclosure.Button>
              </div>

              <Disclosure.Panel>
                <ul role="list" className="divide-y divide-gray-200">
                  <CartSummary />
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
          <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
            <div className="mx-auto max-w-lg">
              <Popover.Button className="flex w-full items-center py-6 font-medium focus:outline-transparent focus:ring-transparent">
                <span className="mr-auto text-base">Total</span>
                <span className="mr-2 text-base">
                  {cart?.totals?.formatted?.total}
                </span>
                <ChevronUpIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                  <dl className="mx-auto max-w-lg space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd>{cart?.totals?.formatted?.subTotal}</dd>
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd>$15.00</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Taxes</dt>
                      <dd>$26.80</dd>
                    </div> */}
                  </dl>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </Popover>
      </section>
    </>
  )
}

export default MobileSummary

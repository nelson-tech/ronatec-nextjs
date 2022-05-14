import { Fragment } from "react"
import shallow from "zustand/shallow"
import { Dialog, Transition } from "@headlessui/react"

import useStore from "@lib/hooks/useStore"

import CartPane from "./CartPane"

const CartSlider = () => {
  const { open, setOpen } = useStore(
    state => ({
      open: state.cart.open,
      setOpen: state.cart.setOpen,
    }),
    shallow,
  )

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40" onClose={setOpen}>
          {/* <div className="absolute inset-0 overflow-hidden"> */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <CartPane />
          {/* </div> */}
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default CartSlider

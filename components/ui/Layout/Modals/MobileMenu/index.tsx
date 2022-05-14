import { Fragment } from "react"
import shallow from "zustand/shallow"
import { Dialog, Transition } from "@headlessui/react"

import useStore from "@lib/hooks/useStore"

import MenuPane from "./MenuPane"

// import CurrencySelector from "../CurrencySelector"

const MobileMenu = () => {
  const { open, setOpen } = useStore(
    state => ({
      open: state.ui.mobileMenuOpen,
      setOpen: state.ui.setMobileMenuOpen,
    }),
    shallow,
  )

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <MenuPane />
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default MobileMenu

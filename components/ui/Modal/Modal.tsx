"use client"

import {
  Children,
  cloneElement,
  FC,
  Fragment,
  ReactElement,
  useRef,
} from "react"
import { Dialog, Transition } from "@headlessui/react"

// ####
// #### Types
// ####

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  children: ReactElement
}

// ####
// #### Component
// ####

const Modal: FC<Props> = ({ open, setOpen, children }) => {
  const firstFocusRef = useRef(null)
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        initialFocus={firstFocusRef}
        onClose={() => setOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
              {/* Dialog Content Goes Here */}
              {Children.map(children, (child) => {
                return cloneElement(child, {
                  modalRef: firstFocusRef,
                  setOpen,
                })
              })}
              {/* Dialog Content Ends Here */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal

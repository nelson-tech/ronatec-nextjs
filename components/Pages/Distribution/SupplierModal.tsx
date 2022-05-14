import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import Image from "@components/Image"
import Icon from "@components/ui/Icon"
import { ChosenSupplierType } from "@components/Cards/Supplier"

import { Underlined, underSelect } from "@styles/utils"

// ####
// #### Types
// ####

type PropsType = {
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  chosenSupplier: ChosenSupplierType | undefined
}

// ####
// #### Component
// ####

const SupplierModal = ({ isOpen, setIsOpen, chosenSupplier }: PropsType) => {
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
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
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block mt-32 border-2 border-gray-100 w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {chosenSupplier && (
                  <div className="">
                    {chosenSupplier.image && chosenSupplier.image.sourceUrl && (
                      <div className="w-full h-full overflow-hidden">
                        <a
                          href={chosenSupplier.url || undefined}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Image
                            src={chosenSupplier.image.sourceUrl}
                            width={
                              chosenSupplier.image.mediaDetails?.width ||
                              undefined
                            }
                            height={
                              chosenSupplier.image.mediaDetails?.height ||
                              undefined
                            }
                            alt={chosenSupplier.image.altText || undefined}
                            layout="responsive"
                            objectFit="fill"
                            title={chosenSupplier.title || ""}
                          />
                        </a>
                      </div>
                    )}

                    {chosenSupplier.text && (
                      <div className="p-4 h-full text-sm">
                        <div className="flex items-baseline text-gray-500">
                          <p className="text-center">{chosenSupplier.text}</p>
                        </div>
                      </div>
                    )}

                    <div
                      className="bg-blue-main text-gray-100 text-center w-full"
                      css={underSelect}
                    >
                      <a
                        href={chosenSupplier.url || undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="flex py-2 items-center justify-center w-full h-full pl-4"
                      >
                        <Underlined className="target">
                          Visit {chosenSupplier.title}
                        </Underlined>
                        <div className="px-4">
                          <Icon
                            name="external-link"
                            className="text-gray-700 w-4 ml-4"
                            type="regular"
                            iconKey={chosenSupplier.url + "--open-new-window"}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SupplierModal

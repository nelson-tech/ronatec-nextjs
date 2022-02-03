import { Fragment, useState } from "react"
import { InferGetStaticPropsType } from "next"
import Image from "next/image"
import { Dialog, Transition } from "@headlessui/react"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { normalize } from "@api/utils"
import { getDistributionData } from "@api/queries/pages/about"
import { SuppliersReturnType } from "@api/queries/types"
import { Underlined, underSelect } from "styles/utils"

import { Icon, LoadingDots } from "@components/ui"
import { SupplierCard } from "@components/Cards"
import { ChosenSupplierType } from "@components/Cards/Supplier"

// ####
// #### Component
// ####

export default function Distribution({
  suppliers,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  const [isOpen, setIsOpen] = useState(false)
  const [chosenSupplier, setChosenSupplier] = useState<
    ChosenSupplierType | undefined
  >()

  if (loading) return <LoadingDots />

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    return a.title! < b.title! ? -1 : a.title! < b.title! ? 1 : 0
  })

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block border-4 border-gray-300 w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                            title={chosenSupplier.title || undefined}
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className="relative bg-white pb-16 py-8">
        <div className="mx-auto px-8 lg:max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sortedSuppliers.map(supplier => {
              return (
                <SupplierCard
                  supplier={supplier}
                  key={supplier.id}
                  setChosenSupplier={setChosenSupplier}
                  chosenSupplier={chosenSupplier}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { suppliers, menu },
    loading,
    error,
  }: SuppliersReturnType = await client.query({
    query: getDistributionData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: {
      loading,
      suppliers: suppliers.nodes,
      menuItems,
      error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

import { getDistributionData } from "@api/queries/pages/about"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { PageReturnType, SuppliersReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { InferGetStaticPropsType } from "next"
import { Icon, LoadingDots } from "@components/ui"
import { IconCard, SupplierCard } from "@components/Cards"
import { Disclosure, Transition } from "@headlessui/react"
import Image from "next/image"
import { useState } from "react"

// ####
// #### Component
// ####

export default function Distribution({
  suppliers,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (loading) return <LoadingDots />
  menuItemsVar(menuItems)

  const [openDisclosureKey, setOpenDisclosureKey] = useState("")

  const toggleDisclosure = (key: string) => {
    setOpenDisclosureKey(prev => (prev !== key ? key : ""))
  }

  suppliers.map(supplier => {
    console.log(supplier)
  })

  return (
    <div className="relative bg-white pb-16 py-8">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[...suppliers]
            .sort((a, b) => {
              return a.title! < b.title! ? -1 : a.title! < b.title! ? 1 : 0
            })
            .map(supplier => {
              // return <SupplierCard supplier={supplier} />
              return (
                <div className="block" key={supplier.slug}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <div
                          onClick={() =>
                            toggleDisclosure(supplier.slug || supplier.title!)
                          }
                        >
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-800 bg-gray-200 rounded-lg hover:bg-blue-main hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>{supplier.title}</span>
                            <Icon
                              name="chevron-up"
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5`}
                            />
                          </Disclosure.Button>
                        </div>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          show={
                            (supplier.slug || supplier.title!) ===
                            openDisclosureKey
                          }
                        >
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 relative flex flex-col">
                            <div className="relative w-full h-full px-2 pb-2">
                              <Image
                                src={supplier.supplier?.image?.sourceUrl || ""}
                                objectFit="contain"
                                layout="responsive"
                                height={
                                  supplier.supplier?.image?.mediaDetails
                                    ?.height || 100
                                }
                                width={
                                  supplier.supplier?.image?.mediaDetails
                                    ?.width || 100
                                }
                              />
                            </div>
                            {supplier.supplier?.text}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>
              )
            })}
        </div>
      </div>
    </div>
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

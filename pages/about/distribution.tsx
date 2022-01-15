import { getDistributionData } from "@api/queries/pages/about"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { PageReturnType, SuppliersReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { InferGetStaticPropsType } from "next"
import { Icon, LoadingDots } from "@components/ui"
import { IconCard, SupplierCard } from "@components/Cards"
import { Disclosure, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment, useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"

// ####
// #### Component
// ####

export const Masonry = styled.div`
  @media (min-width: 768px) {
    column-count: 2;
    column-gap: 1em;
  }
  @media (min-width: 1024px) {
    column-count: 3;
    column-gap: 1em;
  }
  &.break-inside {
    break-inside: avoid;
  }
  // Quick edits below
  ${tw``}
`

export default function Distribution({
  suppliers,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  menuItemsVar(menuItems)

  const [openDisclosureKey, setOpenDisclosureKey] = useState("")

  const toggleDisclosure = (key: string) => {
    setOpenDisclosureKey(prev => (prev !== key ? key : ""))
  }
  if (loading) return <LoadingDots />

  suppliers.map(supplier => {
    console.log(supplier)
  })

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    return a.title! < b.title! ? -1 : a.title! < b.title! ? 1 : 0
  })

  return (
    <div className="relative bg-white pb-16 py-8">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <Masonry className="box-border mx-auto before:box-inherit after:box-inherit">
          {sortedSuppliers.map(supplier => {
            // return <SupplierCard supplier={supplier} />
            return (
              // <Disclosure as={Fragment} key={supplier.id}>
              //   {({ open, close }) => (
              //     <>
              //       {!open && (
              //         <Disclosure.Button as={Fragment}>
              //           <div
              //             onClick={() =>
              //               toggleDisclosure(supplier.id || supplier.title!)
              //             }
              //             className="overflow-hidden focus:outline-none my-6 rounded-md relative w-full h-full"
              //           >
              //             <Image
              //               src={supplier.supplier?.image?.sourceUrl || ""}
              //               alt={supplier.supplier?.image?.altText || ""}
              //               objectFit="contain"
              //               layout="responsive"
              //               height={
              //                 supplier.supplier?.image?.mediaDetails?.height ||
              //                 100
              //               }
              //               width={
              //                 supplier.supplier?.image?.mediaDetails?.width ||
              //                 100
              //               }
              //             />
              //           </div>
              //         </Disclosure.Button>
              //       )}
              //       <Transition
              //         enter="transition duration-100 ease-out"
              //         enterFrom="transform scale-95 opacity-0"
              //         enterTo="transform scale-100 opacity-100"
              //         leave="transition duration-75 ease-out"
              //         leaveFrom="transform scale-100 opacity-100"
              //         leaveTo="transform scale-95 opacity-0"
              //         show={supplier.id === openDisclosureKey}
              //       >
              //         <Disclosure.Panel
              //           onClick={() => {
              //             setOpenDisclosureKey("")
              //             close()
              //           }}
              //           className="px-4 pt-4 pb-2 text-sm text-gray-500 relative flex flex-col"
              //         >
              //           {supplier.supplier?.text}
              //         </Disclosure.Panel>
              //       </Transition>
              //     </>
              //   )}
              // </Disclosure>
              <div className="m-8" key={supplier.id}>
                <div className="overflow-hidden focus:outline-none my-6 rounded-md relative w-full h-full">
                  <Image
                    src={supplier.supplier?.image?.sourceUrl || ""}
                    alt={supplier.supplier?.image?.altText || ""}
                    objectFit="contain"
                    layout="responsive"
                    height={
                      supplier.supplier?.image?.mediaDetails?.height || 100
                    }
                    width={supplier.supplier?.image?.mediaDetails?.width || 100}
                  />
                </div>
              </div>
            )
          })}
        </Masonry>
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

"use client"

import { useState } from "react"
import dynamic from "next/dist/shared/lib/dynamic"

import { Supplier } from "@api/codegen/graphql"

import SupplierCard, { ChosenSupplierType } from "@components/Cards/Supplier"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const SupplierModal = dynamic(() => import("./SupplierModal"), clientOpts)

// ####
// #### Types
// ####

type PropsType = {
  suppliers: Supplier[] | null
}

// ####
// #### Component
// ####

const DistributionComponent = ({ suppliers }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [chosenSupplier, setChosenSupplier] = useState<
    ChosenSupplierType | undefined
  >()

  const sortedSuppliers = suppliers
    ? [...suppliers].sort((a, b) => {
        return a?.title! < b?.title! ? -1 : a?.title! < b?.title! ? 1 : 0
      })
    : []

  return (
    <>
      <SupplierModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chosenSupplier={chosenSupplier}
      />
      <div className="relative bg-white pb-16 py-8">
        <div className="mx-auto px-8 lg:max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sortedSuppliers.map(supplier => {
              if (supplier) {
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
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DistributionComponent

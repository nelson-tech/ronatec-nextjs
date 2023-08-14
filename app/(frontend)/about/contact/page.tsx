import type { Metadata } from "next/types"

import parseMetaData from "@utils/parseMetaData"

import PageHeader from "@components/PageHeader"
import IconCard from "@components/Cards/Icon"
import Map from "@components/Map"

import EmployeeCard from "./EmployeeCard"
import getGlobalData from "@server/utils/getGlobalData"

// ####
// #### Component
// ####

const ContactPage = async () => {
  const page = await getGlobalData("contact")

  const cards = page?.cards
  const salesReps = page?.salesReps
  const map = page?.map

  return (
    <>
      {map && (
        <div className="w-full bg-accent flex justify-center">
          <Map map={map} style={{ maxHeight: "400px" }} />
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Contact Us" />

        <div className="relative bg-white py-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-4">
              {cards &&
                cards.map((card) => {
                  if (card) {
                    return (
                      <div className="pt-8" key={"contact" + card.title}>
                        <IconCard card={card} />
                      </div>
                    )
                  }
                  return null
                })}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full pl-5 py-4 border-t-2">
            <h2 className="text-2xl px-5 font-extrabold mx-auto lg:max-w-7xl">
              Sales Reps
            </h2>
          </div>
          {salesReps && (
            <div className="relative bg-white pt-8 pb-16">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {salesReps.map((salesRep) => {
                    if (salesRep) {
                      return (
                        <EmployeeCard employee={salesRep} key={salesRep.id} />
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ContactPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobalData("contact")

  const metaData = parseMetaData(page?.meta)

  return metaData
}

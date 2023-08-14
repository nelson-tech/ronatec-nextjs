import type { Metadata } from "next/types"
import { BuildingOfficeIcon } from "@heroicons/react/24/outline"

import parseMetaData from "@utils/parseMetaData"

import PageHeader from "@components/PageHeader"
import Map from "@components/Map"
import getGlobalData from "@server/getGlobalData"

// ####
// #### Component
// ####

const WarehousesPage = async () => {
  const page = await getGlobalData("warehouses")

  return (
    <>
      {page?.map && (
        <div className="w-full bg-accent flex justify-center">
          <Map map={page.map} style={{ maxHeight: "400px" }} />
        </div>
      )}
      <div className="mx-auto px-8 lg:max-w-7xl">
        <PageHeader title="Distribution" />
        <div className="w-full flex justify-center">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 text-sm md:text-base max-w-[90%] md:max-w-[80%]">
            {page?.map?.markers &&
              page.map.markers.map((warehouse) => {
                return (
                  <div
                    className="flex py-4 items-center text-center"
                    key={"warehouse" + warehouse?.label}
                  >
                    <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                    {warehouse?.label}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default WarehousesPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobalData("warehouses")

  const metaData = parseMetaData(page?.meta)

  return metaData
}

import { Fragment } from "react"
import type { Metadata } from "next/types"
import OfficeBuildingIcon from "@heroicons/react/24/outline/BuildingOfficeIcon"

import type {
  Post_Maps_Markers,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"
import parseMetaData from "@lib/utils/parseMetaData"
import getWarehousesData from "@lib/server/about/getWarehouseData"

import PageHeader from "@components/PageHeader"
import Map from "@components/Map"

// ####
// #### Component
// ####

const WarehousesPage = async () => {
  const page = await getWarehousesData()

  const warehouses = page?.page_about_warehouses?.acf?.map

  const markers = warehouses?.markers

  return (
    <Fragment>
      <div className="w-full bg-accent flex justify-center">
        <Map
          markers={markers as Post_Maps_Markers[]}
          style={{ maxHeight: "400px" }}
        />
      </div>
      <div className="mx-auto px-8 lg:max-w-7xl">
        <PageHeader title="Distribution" />
        <div className="w-full flex justify-center">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 text-sm md:text-base max-w-[90%] md:max-w-[80%]">
            {warehouses?.markers &&
              warehouses.markers.map((warehouse) => {
                return (
                  <div
                    className="flex py-4 items-center text-center"
                    key={"warehouse" + warehouse?.label}
                  >
                    <OfficeBuildingIcon className="h-5 w-5 mr-2" />
                    {warehouse?.label}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default WarehousesPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWarehousesData()

  const metaData = parseMetaData(page?.seo as RankMathProductTypeSeo)

  return metaData
}

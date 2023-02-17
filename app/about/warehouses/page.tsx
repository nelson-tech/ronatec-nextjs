import { Fragment } from "react"
import OfficeBuildingIcon from "@heroicons/react/24/outline/BuildingOfficeIcon"

import type {
  Post_Maps_Markers,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"
import parseMetaData from "@lib/utils/parseMetaData"
import getWarehousesData from "@lib/server/about/getWarehouseData"

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
      <Map
        markers={markers as Post_Maps_Markers[]}
        style={{ maxHeight: "400px" }}
      />

      <div className="relative bg-white py-8 px-2 mx-auto max-w-md w-2/3 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 text-sm font-medium">
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
    </Fragment>
  )
}

export default WarehousesPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata() {
  const page = await getWarehousesData()

  const metaData = parseMetaData(page?.seo as RankMathProductTypeSeo)

  return metaData
}

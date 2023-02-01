import OfficeBuildingIcon from "@heroicons/react/24/outline/BuildingOfficeIcon"

import {
  GetWarehousesDataDocument,
  Post_Maps_Markers,
} from "@api/codegen/graphql"
import useClient from "@api/client"

import Map from "@components/Map"

// ####
// #### Server Calls
// ####

const getWarehousesData = async () => {
  const client = useClient()

  const warehousesData = await client.request(GetWarehousesDataDocument)

  return warehousesData.page
}

// ####
// #### Component
// ####

const WarehousesPage = async () => {
  const page = await getWarehousesData()

  const warehouses = page?.page_about_warehouses?.acf?.map

  const markers = warehouses?.markers

  return (
    <>
      <Map markers={markers as Post_Maps_Markers[]} />

      <div className="relative bg-white py-8 px-2">
        <div className="mx-auto max-w-md w-2/3 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 text-sm font-medium">
            {warehouses?.markers &&
              warehouses.markers.map(warehouse => {
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
    </>
  )
}

// ####
// #### API
// ####

export default WarehousesPage

import { InferGetStaticPropsType } from "next"
import dynamic from "next/dist/shared/lib/dynamic"
import OfficeBuildingIcon from "@heroicons/react/outline/OfficeBuildingIcon"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetWarehousesDataDocument,
  GetWarehousesDataQuery,
  Page,
} from "@api/codegen/graphql"

import PageTitle from "@components/PageTitle"
import Layout from "@components/ui/Layout"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

// TODO - Find better map solution
const Map = dynamic(() => import("@components/Map"), clientOpts)

// ####
// #### Component
// ####

const Warehouses = ({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const warehouses = page?.page_about_warehouses?.acf?.map

  const markers = warehouses?.markers

  return (
    <>
      <Layout>
        <PageTitle
          title={page?.title || "Warehouse Locations"}
          description="Map and list of warehouse locations."
        />

        <Map
          markers={markers}
          containerClassNames="aspect-2 md:aspect-3"
          options={warehouses?.mapOptions || undefined}
        />

        <div className="relative bg-white py-8 px-2">
          <div className="mx-auto max-w-md w-2/3 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm font-medium">
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
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Warehouses)

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const { client, ssrCache } = urql()

  const { data } = await client
    .query<GetWarehousesDataQuery>(GetWarehousesDataDocument)
    .toPromise()

  const staticProps = {
    props: {
      page: (data?.page as Page | null | undefined) || null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}

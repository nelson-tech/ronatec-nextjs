import { InferGetStaticPropsType } from "next"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { getWarehousesData } from "@api/queries/pages/about"
import { PageReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import Map from "@components/Map"

import { Icon, LoadingDots } from "@components/ui"
import { OfficeBuildingIcon } from "@heroicons/react/outline"

const About = ({
  page,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (loading) return <LoadingDots />
  menuItemsVar(menuItems)

  const warehouses = page.page_about_warehouses?.acf?.map

  const markers = warehouses?.markers

  return (
    <>
      <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
        <h2>Warehouses</h2>
      </div>
      <Map
        markers={markers}
        containerClassNames="aspect-3"
        options={warehouses?.mapOptions || undefined}
      />

      <div className="relative bg-white py-8 px-2">
        <div className="mx-auto max-w-md w-2/3 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm font-medium">
            {warehouses &&
              warehouses.markers &&
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

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page, menu },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getWarehousesData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: {
      loading,
      page,
      menuItems,
      error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export default About

import { InferGetStaticPropsType } from "next"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { getWarehousesData } from "@api/queries/pages/about"
import { PageReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import Map from "@components/Map"

import { Icon, LoadingDots } from "@components/ui"

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
        containerClassNames="responsivePadding"
        options={warehouses?.mapOptions || undefined}
      />

      <div className="relative bg-white py-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {warehouses &&
              warehouses.markers &&
              warehouses.markers.map(warehouse => {
                return (
                  <div
                    className="flex py-4"
                    key={"warehouse" + warehouse?.label}
                  >
                    <Icon name="box" type="regular" className="h-6 w-6 mr-2" />
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

import { InferGetStaticPropsType } from "next"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { parseNewLines } from "@lib/utils"
import { normalize } from "@api/utils"
import { getContactData } from "@api/queries/pages/about"
import { PageReturnType } from "@api/queries/types"
import { Employee } from "@api/gql/types"

import Map from "@components/Map"
import { Icon, LoadingDots } from "@components/ui"
import { IconCard } from "@components/Cards"

const About = ({
  page,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  if (loading) return <LoadingDots />

  const cards = page.page_about_contact?.acf?.cards
  const salesReps = page.page_about_contact?.acf?.salesReps
  const map = page.page_about_contact?.acf?.map

  return (
    <>
      <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
        <h2>Contact Us</h2>
      </div>
      <Map
        markers={map?.markers}
        options={map?.mapOptions || undefined}
        containerClassNames="aspect-2 md:aspect-3"
        key={map?.fieldGroupName + "map_contact"}
      />

      <div className="relative bg-white py-8">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-4">
            {cards &&
              cards.map(card => {
                if (card) {
                  return (
                    <div className="pt-8">
                      <IconCard card={card} key={"contact" + card.title} />
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
                {salesReps.map(salesRep => {
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
    </>
  )
}

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const contact = employee.contact?.contact
  return (
    <div
      className={`flow-root rounded-lg px-6 pb-0 md:pt-0 h-full${
        false && " text-center"
      }`}
      key={employee.id}
    >
      {employee.title && (
        <h2 className="mt-0 text-xl font-bold text-black tracking-tight border-b-2">
          {employee.title}
        </h2>
      )}
      <h2 className="font-medium text-black tracking-tight">
        {employee.position?.position}
      </h2>

      {contact && (
        <div className="contact mt-4">
          {contact.email && (
            <div className="flex text-sm pb-1">
              <span className="pl-1 pr-3.5 text-xs flex items-center h-full">
                <Icon
                  name="at"
                  className="h-6 w-6 pr-2"
                  iconStyling="text-gray-500"
                />
              </span>
              {contact.email}
            </div>
          )}
          {contact.office && (
            <div className="flex text-sm">
              <span className="pl-1 pr-3.5 text-xs flex items-center h-full">
                <Icon
                  name="phone"
                  className="h-6 w-6 pr-2"
                  iconStyling="text-gray-500"
                />
              </span>
              {contact.office}
            </div>
          )}
        </div>
      )}

      {employee.regions && employee.regions.regions && (
        <div className="mt-5 text-sm text-gray-500">
          {parseNewLines(employee.regions.regions)}
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page, menu },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getContactData,
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

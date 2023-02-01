import {
  Employee,
  GetContactDataDocument,
  Post_Common_Cards,
  Post_Maps_Markers,
} from "@api/codegen/graphql"
import useClient from "@api/client"

import IconCard from "@components/Cards/Icon"
import EmployeeCard from "@components/Cards/Employee"
import Map from "@components/Map"

// ####
// #### Server Calls
// ####

const getContactData = async () => {
  const client = useClient()

  const contactData = await client.request(GetContactDataDocument)

  return contactData.page
}

// ####
// #### Component
// ####

const ContactPage = async () => {
  const page = await getContactData()

  const cards = page?.page_about_contact?.acf?.cards
  const salesReps = page?.page_about_contact?.acf?.salesReps
  const map = page?.page_about_contact?.acf?.map

  return (
    <>
      <Map
        markers={map?.markers as Post_Maps_Markers[]}
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
                    <div className="pt-8" key={"contact" + card.title}>
                      <IconCard card={card as Post_Common_Cards} />
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
                      <EmployeeCard
                        employee={salesRep as Employee}
                        key={salesRep.id}
                      />
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

export default ContactPage

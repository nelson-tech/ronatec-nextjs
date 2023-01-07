import { InferGetStaticPropsType } from "next"
import dynamic from "next/dist/shared/lib/dynamic"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetContactDataDocument,
  GetContactDataQuery,
  Page,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import IconCard from "@components/Cards/Icon"
import EmployeeCard from "@components/Cards/Employee"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

// TODO - Find better map solution
const Map = dynamic(() => import("@components/Map"), clientOpts)

// ####
// #### Component
// ####

const About = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const cards = page?.page_about_contact?.acf?.cards
  const salesReps = page?.page_about_contact?.acf?.salesReps
  const map = page?.page_about_contact?.acf?.map

  return (
    <>
      <Layout>
        <PageTitle
          title={"Contact Us"}
          description="Employee and Office contact information."
        />

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
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(About)

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const { client, ssrCache } = urql()

  const { data } = await client
    .query<GetContactDataQuery>(GetContactDataDocument)
    .toPromise()

  const staticProps = {
    props: {
      page: (data?.page as Page | null | undefined) ?? null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}

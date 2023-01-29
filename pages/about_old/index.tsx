import { InferGetStaticPropsType } from "next"
import Image from "next/image"

import { parseNewLines } from "@lib/utils"
import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetAboutDataDocument,
  GetAboutDataQuery,
  Page,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

// ####
// #### Component
// ####

const About = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const cards = page?.page_about?.acf?.cards

  return (
    <>
      <Layout>
        <PageTitle
          title={page?.title || "About Us"}
          description="Since 1979, Ronatec has supplied chemicals, equipment, and related services to a wide variety of industries."
        />

        <div className="flex flex-col px-4 md:flex-row pb-8 mx-auto lg:max-w-7xl">
          {cards &&
            cards.map(card => {
              if (card) {
                return (
                  <div className="flex flex-col w-full p-6" key={card.title}>
                    <div
                      className="w-full relative mb-6"
                      style={{ paddingTop: "50%" }}
                    >
                      {card.image && (
                        <Image
                          alt={card.image.altText || ""}
                          src={card.image.sourceUrl || ""}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg overflow-hidden"
                        />
                      )}
                    </div>
                    <div className="pb-6 text-2xl text-blue-dark">
                      {card.title}
                    </div>
                    <div className="">
                      {card.content && (
                        <span className="text-gray-600 text-md font-medium">
                          {parseNewLines(card.content)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              }
            })}
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
    .query<GetAboutDataQuery>(GetAboutDataDocument)
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

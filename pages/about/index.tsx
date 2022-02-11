import { InferGetStaticPropsType } from "next"
import Image from "next/image"

import initializeApollo from "@lib/apollo/client"
import addApolloState from "@lib/apollo/addApolloState"
import { parseNewLines } from "@lib/utils"
import { getAboutData } from "@api/queries/pages/about"
import { PageReturnType } from "@api/queries/types"

import LoadingDots from "@components/ui/LoadingDots"

// ####
// #### Component
// ####

const About = ({
  page,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (loading) return <LoadingDots />

  const { title, slug } = page
  const cards = page.page_about?.acf?.cards

  return (
    <>
      <div className="w-screen mx-auto text-2xl bg-green-main text-white text-center py-2">
        <h2>{page.title}</h2>
      </div>
      <div className="flex flex-col px-4 md:flex-row pb-8 mx-auto lg:max-w-7xl">
        {cards &&
          cards!.map(card => {
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
                        src={card.image.sourceUrl!}
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
                    <span className="text-gray-600 text-md font-medium">
                      {parseNewLines(card.content!)}
                    </span>
                  </div>
                </div>
              )
            }
          })}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getAboutData,
  })

  const staticProps = {
    props: {
      loading,
      page,
      error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export default About

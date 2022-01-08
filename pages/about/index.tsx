import { InferGetStaticPropsType } from "next"
import Image from "next/image"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { getAboutData } from "@api/queries/pages/about"
import { normalize } from "@api/utils"
import { parseNewLines } from "@lib/utils"

import { LoadingDots } from "@components/ui"
import { PageReturnType } from "@api/queries/types"

const About = ({
  page,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (loading) return <LoadingDots />
  menuItemsVar(menuItems)

  const { title, slug } = page
  const cards = page.page_about?.acf?.cards

  return (
    <>
      <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
        <h2>{page.title}</h2>
      </div>
      <div className="flex flex-col md:flex-row pb-8">
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
    data: { page, menu },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getAboutData,
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

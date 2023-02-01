import useClient from "@api/client"
import { GetAboutDataDocument } from "@api/codegen/graphql"
import Image from "@components/Image"

import parseNewLines from "@lib/utils/parseNewLines"

// ####
// #### Server Calls
// ####

const getAboutData = async () => {
  const client = useClient()

  const aboutData = await client.request(GetAboutDataDocument)

  return aboutData.page
}

// ####
// #### Component
// ####

const AboutPage = async () => {
  const page = await getAboutData()

  const cards = page?.page_about?.acf?.cards

  return (
    <>
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
                        fill
                        sizes="(max-width: 400px) 100vw,50vw"
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
    </>
  )
}

export default AboutPage

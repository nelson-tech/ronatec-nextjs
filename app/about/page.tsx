import type { Metadata } from "next/types"

import type { RankMathProductTypeSeo } from "@api/codegen/graphql"
import parseMetaData from "@lib/utils/parseMetaData"
import parseNewLines from "@lib/utils/parseNewLines"
import getAboutData from "@lib/server/about/getAboutData"

import Image from "@components/Image"
import PageHeader from "@components/PageHeader"

// ####
// #### Component
// ####

const AboutPage = async () => {
  const page = await getAboutData()

  const cards = page?.page_about?.acf?.cards

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="About Us" />
        <section className="flex flex-col px-4 md:flex-row pb-8">
          {cards &&
            cards.map((card) => {
              if (card) {
                return (
                  <div className="flex flex-col w-full p-6" key={card.title}>
                    <div className="w-full relative mb-6">
                      {card.image && (
                        <Image
                          alt={card.image.altText ?? ""}
                          src={card.image.sourceUrl ?? ""}
                          width={card.image.mediaDetails?.width ?? undefined}
                          height={card.image.mediaDetails?.height ?? undefined}
                          className="rounded overflow-hidden w-full h-full"
                        />
                      )}
                    </div>
                    <div className="pb-6 text-2xl text-accent">
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
        </section>
      </div>
    </>
  )
}

export default AboutPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutData()

  const metaData = parseMetaData(page?.seo as RankMathProductTypeSeo)

  return metaData
}

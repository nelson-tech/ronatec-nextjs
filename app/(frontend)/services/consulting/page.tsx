import type { Metadata } from "next/types"

import parseNewLines from "@utils/parseNewLines"
import parseMetaData from "@utils/parseMetaData"

import Slider from "@components/Slider"
import IconCard from "@components/Cards/Icon"
import PageHeader from "@components/PageHeader"
import type { Card } from "payload/generated-types"
import getGlobalData from "@server/utils/getGlobalData"

// ####
// #### Component
// ####

const ConsultingPage = async () => {
  const page = await getGlobalData("consulting")

  if (page) {
    const { content, certificates, cards, slides } = page
    return (
      <>
        <div className="mx-auto px-4 max-w-7xl">
          <PageHeader title="Consulting" />
          <div className="flex flex-col md:flex-row pb-8 items-center  space-y-8 mb-8">
            {slides && slides.length > 0 && (
              <Slider
                rounded
                slides={slides}
                containerClassName="w-full md:w-1/2 h-full p-4"
                sliderStyle="relative w-full aspect-[3/2]"
              />
            )}
            <div className="px-4 w-full md:w-1/2 h-full text-gray-700">
              {content && parseNewLines(content)}
            </div>
          </div>

          {/* Certifications */}
          {certificates && certificates.cards && (
            <div className="relative bg-white py-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {certificates.cards.map((card) => {
                    if (card) {
                      return (
                        <IconCard
                          card={card}
                          key={"consultingIconCard" + card?.title}
                          contentStyle="text-sm"
                        />
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          {cards && cards.cards && (
            <div className="relative bg-white py-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {cards.cards.map((card) => {
                    if (card) {
                      return <Card card={card} key={card.title} />
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
  return <div>Error</div>
}

const Card = ({ card }: { card: Card[0] }) => {
  return (
    <div className={`px-6 pb-8 h-full ${false && "text-center"}`}>
      {card.title && (
        <h3 className="mt-8 text-2xl font-medium text-black tracking-tight border-b-2">
          {card.title}
        </h3>
      )}
      {card.content && (
        <div className="mt-5 text-gray-500 whitespace-pre-wrap">
          {card.content}
        </div>
      )}
    </div>
  )
}

export default ConsultingPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobalData("consulting")

  const metaData = parseMetaData(page?.meta)

  return metaData
}

import { InferGetStaticPropsType } from "next"
import dynamic from "next/dynamic"
import { css } from "@emotion/react"
import tw from "twin.macro"

import { addApolloState } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { parseNewLines } from "@lib/utils"
import { normalize } from "@api/utils"
import { getConsultingData } from "@api/queries/pages"
import { Post_Common_Cards } from "@api/gql/types"
import { PageReturnType } from "@api/queries/types"

// import { Slider } from "@components"
// import { LoadingDots } from "@components/ui"
// import { IconCard } from "@components/Cards"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const LoadingDots = dynamic(
  () => import("@components/ui/LoadingDots"),
  importOpts,
)
const IconCard = dynamic(() => import("@components/Cards/Icon"), importOpts)
const Slider = dynamic(() => import("@components/Slider"), importOpts)

// ####
// #### Styling
// ####

const responsivePadding = css`
  padding-top: 52.25%;
  // medium
  @media (min-width: 768px) {
    padding-top: 40%;
  }
  // large
  @media (min-width: 1024px) {
    padding-top: 32.5%;
  }
`

// ####
// #### Component
// ####

const Consulting = ({
  page,
  loading,
  error,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  if (loading) return <LoadingDots />

  const { title, slug } = page

  if (page.page_consulting && page.page_consulting.acf) {
    const { content, callout, certificates, cards, slides, ...consulting } =
      page.page_consulting.acf
    return (
      <>
        <div className="w-screen mx-auto text-2xl bg-green-main text-white text-center py-2">
          <h2>{title}</h2>
        </div>
        <div className="px-4">
          <div className="mt-8 flex flex-col md:flex-row pb-8 items-center mx-auto lg:max-w-7xl">
            {slides && slides.length > 0 && (
              <Slider
                slides={slides}
                imageFit="cover"
                rounded
                sliderStyle={[
                  tw`relative w-full h-full m-4`,
                  responsivePadding,
                ]}
              />
            )}
            <div className="px-4 w-full h-full text-sm text-gray-700">
              {content && parseNewLines(content)}
            </div>
          </div>

          {/* Certifications */}
          {certificates && certificates.cards && (
            <div className="relative bg-white py-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {certificates.cards.map(card => {
                    if (card) {
                      return (
                        <IconCard
                          card={card}
                          key={"consultingIconCard" + card?.title}
                          contentStyle={tw`text-sm`}
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
                  {cards.cards.map(card => {
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

const Card = ({ card }: { card: Post_Common_Cards }) => {
  return (
    <div
      className={`flow-root rounded-lg px-6 pb-8 md:pt-0 h-full${
        false && " text-center"
      }`}
    >
      {card.title && (
        <h3 className="mt-8 text-2xl font-medium text-black tracking-tight border-b-2">
          {card.title}
        </h3>
      )}
      <div className="mt-5 text-sm text-gray-500">
        {card.content && parseNewLines(card.content)}
      </div>
    </div>
  )
}

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const initializeApollo = (await import("@lib/apollo/client")).initializeApollo
  const client = initializeApollo({})

  const {
    data: { page, menu },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getConsultingData,
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

export default Consulting

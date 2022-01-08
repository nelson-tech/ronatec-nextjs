import type { InferGetStaticPropsType } from "next"
import Image from "next/image"
import tw from "twin.macro"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { getHomeData } from "@api/queries/pages"
import { normalize } from "@api/utils"

import { LoadingDots } from "@components/ui"
import { Slider, VideoCard } from "@components"
import { IconCard, SupplierCard } from "@components/Cards"
import { PageReturnType } from "@api/queries/types"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// ####
// #### Component
// ####

export default function Home({
  page: home,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (loading) return <LoadingDots />
  menuItemsVar(menuItems)

  const slides = home.page_home?.acf?.slides
  const cards = home.page_home?.acf?.cards
  const supplier = home.page_home?.acf?.featuredSupplier
  const videoLink = home.page_home?.acf?.videoLink

  return (
    <>
      <div className="relative aspect-3 -mx-5 w-screen h-full mb-8 mt-0">
        <div className="w-full absolute bg-opacity-80 h-full z-10 bg-white">
          <div className="w-2/3 lg:w-1/2 h-full relative mx-auto my-auto">
            <Image
              src={`https://ronatec.us/wp-content/uploads/2015/11/ronatec_retina.png`}
              layout="fill"
              alt="Ronatec Logo"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      {/* 
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover z-0"
        >
          <source
            src="https://cdn.ronatec.us/ronatec/20220102201608/can-capping.mp4"
            type="video/mp4"
          />
        </video>
      </div> */}

      {slides && (
        <Slider
          slides={slides}
          containerClassName="responsivePadding relative -mx-5 w-screen h-full mb-8 mt-0"
          imageFit="cover"
        />
      )}

      {cards && (
        <div className="relative bg-white pb-16 py-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {cards.map(card => {
                if (card) {
                  return <IconCard card={card} key={card.title} />
                }
              })}
            </div>
          </div>
        </div>
      )}

      {videoLink && (
        <VideoCard
          videoLink={videoLink}
          cardStyle={tw`pb-12 w-full md:w-4/5 lg:w-2/3 mx-auto`}
        />
      )}

      {supplier && (
        <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
          <SupplierCard headerText="Featured Supplier" supplier={supplier} />
        </div>
      )}
    </>
  )
}

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page, menu },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getHomeData,
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

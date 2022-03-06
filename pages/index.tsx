import type { InferGetStaticPropsType } from "next"
import dynamic from "next/dist/shared/lib/dynamic"
import tw from "twin.macro"

import initializeApollo from "@lib/apollo/client"
import addApolloState from "@lib/apollo/addApolloState"
import { PageReturnType } from "@api/queries/types"
import { getHomeData } from "@api/queries/pages"

// import { LoadingDots, MenuLink } from "@components/ui"
// import { Slider, VideoCard, Image } from "@components"
// import { IconCard, SupplierCard } from "@components/Cards"
import LoadingDots from "@components/ui/LoadingDots"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const IconCard = dynamic(() => import("@components/Cards/Icon"), importOpts)
const Image = dynamic(() => import("@components/Image"), importOpts)
// const LoadingDots = dynamic(
//   () => import("@components/ui/LoadingDots"),
//   importOpts,
// )
const MenuLink = dynamic(() => import("@components/ui/MenuLink"), importOpts)
const SupplierCard = dynamic(
  () => import("@components/Cards/Supplier"),
  importOpts,
)
const VideoCard = dynamic(() => import("@components/VideoCard"), importOpts)
const CardCarousel = dynamic(
  () => import("@components/CardCarousel"),
  importOpts,
)

// ####
// #### Component
// ####

export default function Home({
  page: home,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (loading) return <LoadingDots />

  const slides = home.page_home?.acf?.slides
  const cards = home.page_home?.acf?.cards
  const supplier = home.page_home?.acf?.featuredSupplier
  const videoLink = home.page_home?.acf?.videoLink

  return (
    <div className=" mx-auto lg:max-w-7xl pb-4">
      <div className="lg:relative lg:pb-16">
        <div className="mx-auto max-w-7xl px-2 w-full py-16 text-center lg:pt-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Ronatec C2C, Inc.</span>{" "}
              <span className="block text-blue-main xl:inline text-2xl md:text-4xl lg:text-3xl">
                Chemicals &amp; Metal Finishing
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Since 1979, Ronatec has supplied chemicals, equipment, and related
              services to a wide variety of industries.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <MenuLink
                  href="/products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-main hover:bg-blue-dark md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </MenuLink>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <MenuLink
                  href="/about/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-main bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Contact Us
                </MenuLink>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden overflow-hidden lg:h-full lg:block w-screen lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:h-full">
          <Image
            // className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.ronatec.us/ronatec/20211130031916/san-diego.jpg"
            alt="Image"
            objectFit="fill"
            layout="responsive"
          />
        </div>
      </div>

      <CardCarousel
        header="Shop by Category"
        // link={{ label: "Browse all categories", path: "/products" }}
        query="productCategories(where: {hideEmpty: true})"
      />

      <CardCarousel
        header="Top Selling Products"
        query="products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8)"
        product
      />

      {cards && (
        <div className="relative bg-white pb-16 py-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {cards.map(card => {
                if (card) {
                  return (
                    <IconCard
                      card={card}
                      key={card.title || "" + card.icon || ""}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      )}

      {videoLink && (
        <VideoCard
          videoLink={videoLink}
          cardStyle={tw`pb-12 px-5 w-full md:w-4/5 lg:w-2/3 mx-auto`}
          light
        />
      )}

      {supplier && (
        <div className="mx-auto w-full px-5 md:w-2/3 lg:w-1/2">
          <SupplierCard
            headerText="Featured Supplier"
            supplier={supplier}
            featured
          />
        </div>
      )}
    </div>
  )
}

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page },
    loading,
    error,
  }: PageReturnType = await client.query({
    query: getHomeData,
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

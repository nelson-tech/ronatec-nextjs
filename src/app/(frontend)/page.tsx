import type { Metadata } from "next/types"

import getHomeData from "./page.load"
import parseMetaData from "@utils/parseMetaData"
import type { Category, Image as ImageType } from "~payload-types"

import CardCarousel from "@components/CardCarousel"
import Link from "@components/Link"
import VideoCard from "@components/VideoCard"
import SupplierCard from "@components/Cards/Supplier"
import IconCard from "@components/Cards/Icon"
import WarehousesCards from "@components/WarehousesCards"
import getPayloadClient from "~payload/payloadClient"

const HomePage = async () => {
  const data = await getHomeData()

  const client = await getPayloadClient()

  const heroImage = (await client.findByID({
    collection: "images",
    id: "653d53fbc381b5fb6cfe0420",
  })) as ImageType

  const home = data?.home
  const topSellers = data?.topSellers

  return (
    <div className="pb-4">
      <div className="mx-auto max-w-7xl px-2 w-full py-16 text-center">
        <div className="px-4 sm:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl">
            <span className="block xl:inline">Ronatec C2C, Inc.</span>{" "}
            <span className="block text-accent xl:inline text-2xl sm:text-3xl">
              Chemicals &amp; Metal Finishing
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Since 1979, Ronatec has supplied chemicals, equipment, and related
            services to a wide variety of industries.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="shadow">
              <Link
                href="/products"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent \
                rounded text-white bg-accent hover:bg-blue-dark md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Shop Now
              </Link>
            </div>
            <div className="rounded shadow ml-3">
              <Link
                href="/about/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent \
                rounded text-accent bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-[40rem] md:h-96 bg-cover bg-bottom bg-no-repeat z-10 xl:rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${heroImage.url})` }}
        >
          <div className=" bg-black/50 h-full w-full z-0" />
          <div
            className={` absolute p-8 text-white text-center inset-0 w-full py-4 z-10 h-full flex flex-col justify-center items-center`}
          >
            <h1 className={` text-4xl uppercase font-bold mb-8`}>
              Process Tank Lines
            </h1>
            <p className="text-lg px-8 mb-8">
              Ronatec C2C, Inc. has a history of being at the forefront and
              introducing innovative concepts in the planning, construction, and
              installation of process tank systems.
            </p>
            <a
              href="/services/process-tank-lines"
              className="text-lg px-8 bg-white text-accent py-4 rounded hover:text-highlight transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <WarehousesCards />

      {home?.carousels && (
        <div className="mt-4">
          {typeof home.carousels.categories?.categories?.at(0) === "object" && (
            <CardCarousel
              header="Shop by Category"
              link={{ label: "Browse all categories", url: "/products" }}
              categories={home.carousels.categories.categories as Category[]}
            />
          )}

          <CardCarousel header="Top Selling Products" products={topSellers} />
        </div>
      )}

      {home?.cards && (
        <div className="mx-auto max-w-7xl relative bg-white pb-16 py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {home.cards.map((card) => {
              if (card) {
                return (
                  <IconCard
                    card={card}
                    key={card.title ?? "" + card.icon ?? ""}
                  />
                )
              }
            })}
          </div>
        </div>
      )}

      {home?.videos?.map((videoLink) => {
        if (videoLink?.id)
          return (
            <VideoCard
              key={videoLink.id}
              videoLink={videoLink}
              cardStyle={`pb-12 px-5 w-full md:w-4/5 lg:w-2/3 mx-auto`}
              light
            />
          )
      })}

      {typeof home?.featuredSupplier === "object" && (
        <div className="mx-auto max-w-7xl w-full px-5 md:w-2/3 lg:w-1/2">
          <SupplierCard
            headerText="Featured Supplier"
            supplier={home.featuredSupplier}
            featured
          />
        </div>
      )}
    </div>
  )
}

export default HomePage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData()

  const metaData = parseMetaData({
    meta: data?.home.meta,
  })

  return metaData
}

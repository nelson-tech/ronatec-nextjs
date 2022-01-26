import type { InferGetStaticPropsType } from "next"
import tw from "twin.macro"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { PageReturnType } from "@api/queries/types"
import { getGeneralPageData, getHomeData } from "@api/queries/pages"
import { normalize } from "@api/utils"

import { LoadingDots, MenuLink } from "@components/ui"
import { Slider, VideoCard, Image } from "@components"
import { IconCard, SupplierCard } from "@components/Cards"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// ####
// #### Component
// ####

const categories = [
  {
    name: "New Arrivals",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg",
  },
  {
    name: "Productivity",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg",
  },
  {
    name: "Workspace",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg",
  },
  {
    name: "Accessories",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg",
  },
  {
    name: "Sale",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg",
  },
]

export default function Home({
  page: home,
  menuItems,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  if (loading) return <LoadingDots />

  const slides = home.page_home?.acf?.slides
  const cards = home.page_home?.acf?.cards
  const supplier = home.page_home?.acf?.featuredSupplier
  const videoLink = home.page_home?.acf?.videoLink

  return (
    <div className=" mx-auto lg:max-w-7xl pb-4">
      <div className="lg:relative mb-8">
        <div className="mx-auto max-w-7xl px-2 w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
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
        <div className="relative hidden lg:block w-screen h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <Image
            // className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.ronatec.us/ronatec/20211130031916/san-diego.jpg"
            alt="Image"
            objectFit="fill"
            layout="responsive"
          />
        </div>
      </div>
      {/* <div className="relative aspect-1 -mx-5 w-screen mb-8 mt-0">
        <div className="w-full absolute aspect-video bg-white flex">
          <div className="w-2/3 lg:w-1/3 relative mx-auto">
            <Image
              src="https://ronatec.us/wp-content/uploads/2015/11/ronatec_retina.png"
              layout="responsive"
              alt="Ronatec Logo"
              objectFit="contain"
            />
          </div>
        </div>
      </div> */}
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

      {/* {slides && (
        <Slider
          slides={slides}
          containerClassName="aspect-3 relative -mx-5 w-screen h-full mb-8 mt-0"
          imageFit="cover"
        />
      )} */}

      <div className="bg-white">
        <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
          <div className="px-8 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-blue-main hover:text-blue-dark sm:block"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                <div className="absolute px-8 min-w-screen-xl flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                  {categories.map(category => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative w-56 h-72 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={category.imageSrc}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {category.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-8 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-blue-main hover:text-blue-dark"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>

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
        />
      )}

      {supplier && (
        <div className="mx-auto w-full px-5 md:w-2/3 lg:w-1/2">
          <SupplierCard headerText="Featured Supplier" supplier={supplier} />
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

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
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

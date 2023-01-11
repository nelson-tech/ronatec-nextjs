import CardCarousel from "@components/CardCarousel"
import Link from "@components/Link"
import Image from "@components/Image"
import VideoCard from "@components/VideoCard"
import SupplierCard from "@components/Cards/Supplier"
import IconCard from "@components/Cards/Icon"
import {
  GetHomeDataQuery,
  Post_Common_Cards,
  Product,
  ProductCategory,
  Supplier,
} from "@api/codegen/graphql"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

// const IconCard = dynamic(() => import("@components/Cards/Icon"), clientOpts)
// const SupplierCard = dynamic(
//   () => import("@components/Cards/Supplier"),
//   clientOpts,
// )
// const VideoCard = dynamic(() => import("@components/VideoCard"), clientOpts)

// ####
// #### Types
// ####

type PropsType = {
  home: GetHomeDataQuery["page"]
  topSellers: Product[] | null | undefined
  categories: ProductCategory[] | null | undefined
}

// ####
// #### Component
// ####

const Home = ({ home, categories, topSellers }: PropsType) => {
  const cards = home?.page_home?.acf?.cards as Post_Common_Cards[]
  const supplier = home?.page_home?.acf?.featuredSupplier as Supplier
  const videoLink = home?.page_home?.acf?.videoLink

  return (
    <>
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
                Since 1979, Ronatec has supplied chemicals, equipment, and
                related services to a wide variety of industries.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-main hover:bg-blue-dark md:py-4 md:text-lg md:px-10"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    href="/about/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-main bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden overflow-hidden lg:h-full lg:block w-screen lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:h-full">
            <Image
              src="https://cdn.ronatec.us/ronatec/20211130031916/san-diego.jpg"
              alt="Image"
              fill
              priority
              sizes="50vw"
            />
          </div>
        </div>

        <CardCarousel
          header="Shop by Category"
          // link={{ label: "Browse all categories", path: "/products" }}
          items={categories}
        />

        <CardCarousel header="Top Selling Products" products={topSellers} />

        {/* {cards && (
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
        )} */}

        {videoLink && (
          <VideoCard
            videoLink={videoLink}
            cardStyle={`pb-12 px-5 w-full md:w-4/5 lg:w-2/3 mx-auto`}
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
    </>
  )
}

export default Home

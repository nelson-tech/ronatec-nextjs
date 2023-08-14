import CardCarousel from "@components/CardCarousel"
import Link from "@components/Link"
import VideoCard from "@components/VideoCard"
import SupplierCard from "@components/Cards/Supplier"
import IconCard from "@components/Cards/Icon"
import type { Category, Home, Product } from "payload/generated-types"

// ####
// #### Types
// ####

type PropsType = {
  home: Home | undefined
  topSellers: Product[] | null | undefined
}

// ####
// #### Component
// ####

const HomePage = ({ home, topSellers }: PropsType) => {
  const cards = home?.cards
  const supplier = home?.featuredSupplier
  const videoLinks = home?.videos

  return (
    <>
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
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded text-white bg-accent hover:bg-blue-dark md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </Link>
              </div>
              <div className="rounded shadow ml-3">
                <Link
                  href="/about/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded text-accent bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {home?.carousels && (
          <div className="mt-4">
            {typeof home.carousels.categories?.categories?.at(0) ===
              "object" && (
              <CardCarousel
                header="Shop by Category"
                link={{ label: "Browse all categories", url: "/products" }}
                categories={home.carousels.categories.categories as Category[]}
              />
            )}

            <CardCarousel header="Top Selling Products" products={topSellers} />
          </div>
        )}

        {cards && (
          <div className="mx-auto max-w-7xl relative bg-white pb-16 py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {cards.map((card) => {
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

        {videoLinks?.map((videoLink) => {
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

        {typeof supplier === "object" && (
          <div className="mx-auto max-w-7xl w-full px-5 md:w-2/3 lg:w-1/2">
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

export default HomePage

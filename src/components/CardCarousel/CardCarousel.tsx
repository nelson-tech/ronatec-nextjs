import { Category, Product } from "~payload-types"
import CarouselCard from "./CarouselCard"
import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Types
// ####

export type PropsType = {
  header: string
  link?: { label?: string | undefined; url?: string | undefined }
  categories?: Category[] | null | undefined
  products?: Product[] | null | undefined
}

// ####
// #### Component
// ####

const CardCarousel = ({ header, link, categories, products }: PropsType) => {
  return (
    <div className="bg-white" data-testid="card-carousel">
      <div className="pb-8">
        <div className="xl:max-w-7xl xl:mx-auto px-8 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {header}
          </h2>
          {link?.url && (
            <Link
              href={link.url}
              className="hidden text-sm font-semibold text-accent hover:text-blue-dark sm:block"
            >
              {link.label}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          )}
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 relative h-80 overflow-x-auto">
              <div className="absolute px-8 min-w-screen-xl flex space-x-8 sm:px-6 lg:px-8">
                {
                  // Show loading icon if no items set
                  // TODO - Account for error cases
                  categories ? (
                    categories.map((item, index) => {
                      return (
                        <CarouselCard
                          name={item.title ?? ""}
                          slug={item.slug ?? ""}
                          image={
                            typeof item.image === "object"
                              ? item.image ?? undefined
                              : undefined
                          }
                          wcImage={item.wc?.image}
                          key={item.title ?? "" + item.slug}
                          index={index}
                        />
                      )
                    })
                  ) : products ? (
                    products.map((cardProduct, index) => {
                      const path = `${
                        cardProduct?.categories
                          ? typeof cardProduct.categories[0] === "object"
                            ? cardProduct.categories[0].slug + "/"
                            : ""
                          : ""
                      }${cardProduct?.slug}`

                      return (
                        <CarouselCard
                          name={cardProduct?.title ?? ""}
                          slug={path}
                          image={
                            typeof cardProduct.featuredImage === "object"
                              ? cardProduct?.featuredImage
                              : undefined
                          }
                          wcImage={cardProduct.wc?.images?.at(0)}
                          key={cardProduct?.title ?? "" + cardProduct?.slug}
                          index={index}
                        />
                      )
                    })
                  ) : (
                    <div className="ml-8 flex items-center h-64 justify-center text-gray-400">
                      Loading...
                      <LoadingSpinner
                        size={5}
                        color="#37b679"
                        opacity={100}
                        className="ml-2"
                      />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        {link?.url && (
          <div className="mt-6 px-8 sm:hidden">
            <Link
              href={link.url}
              className="block text-sm font-semibold text-accent hover:text-blue-dark"
            >
              {link.label}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardCarousel

// TODO - Handle errors

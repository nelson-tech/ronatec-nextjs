import { Product, ProductCategory } from "@api/codegen/graphql"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import MenuLink from "@components/Link"

import CarouselCard from "./CarouselCard"

// ####
// #### Types
// ####

export type PropsType = {
  header: string
  link?: { label: string; path: string }
  items?: ProductCategory[] | null | undefined
  products?: Product[] | null | undefined
}

// ####
// #### Component
// ####

const CardCarousel = ({ header, link, items, products }: PropsType) => {
  const categories = items
    ? items.filter((item) => {
        return item.ancestors?.nodes && item.ancestors.nodes.length == 1
      })
    : null

  return (
    <div className="bg-white" data-testid="card-carousel">
      <div className="pb-8 xl:max-w-7xl xl:mx-auto xl:px-8">
        <div className="px-8 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {header}
          </h2>
          {link && (
            <MenuLink
              href={link.path}
              className="hidden text-sm font-semibold text-accent hover:text-blue-dark sm:block"
            >
              {link.label}
              <span aria-hidden="true"> &rarr;</span>
            </MenuLink>
          )}
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
              <div className="absolute px-8 min-w-screen-xl flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                {
                  // Show loading icon if no items set
                  // TODO - Account for error cases
                  categories ? (
                    categories.map((item, index) => {
                      return (
                        <CarouselCard
                          name={item.name ?? ""}
                          slug={item.slug ?? ""}
                          image={item.image ?? undefined}
                          key={item.name ?? "" + item.slug}
                          index={index}
                        />
                      )
                    })
                  ) : products ? (
                    products.map((cardProduct, index) => {
                      const path = `${
                        cardProduct.productCategories?.nodes
                          ? cardProduct.productCategories.nodes[0]
                            ? cardProduct.productCategories.nodes[0].slug + "/"
                            : ""
                          : ""
                      }${cardProduct.slug}`

                      return (
                        <CarouselCard
                          name={cardProduct.name ?? ""}
                          slug={path}
                          image={cardProduct.image ?? undefined}
                          key={cardProduct.name ?? "" + cardProduct.slug}
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

        {link && (
          <div className="mt-6 px-8 sm:hidden">
            <MenuLink
              href={link.path}
              className="block text-sm font-semibold text-accent hover:text-blue-dark"
            >
              {link.label}
              <span aria-hidden="true"> &rarr;</span>
            </MenuLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardCarousel

// TODO - Handle errors

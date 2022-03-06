import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"

import { Product, ProductCategory } from "@api/gql/types"
import { imageFragment } from "@api/queries/fragments"
import MenuLink from "@components/ui/MenuLink"

import CarouselCard from "./CarouselCard"

// ####
// #### Types
// ####

type CardCarouselPropsType = {
  header: string
  link?: { label: string; path: string }
  query: string
  product?: boolean
}

// ####
// #### Component
// ####

const CardCarousel = ({
  header,
  link,
  query,
  product,
}: CardCarouselPropsType) => {
  const [items, setItems] = useState<ProductCategory[] & Product[]>()
  const [products, setProducts] = useState<Product[]>()

  const getCarouselItemQuery = gql`
query GetCarouselItems${query.split("(")[0]} {
  ${query} {
    nodes {
      id
      name
      slug
      ${imageFragment}
      ${product ? `productCategories { nodes { slug } }` : ""}
    }
  }
}
`
  const { data, loading, error } = useQuery(getCarouselItemQuery)

  useEffect(() => {
    const queryBase = query.split("(")[0]
    if (data && data[queryBase] && data[queryBase].nodes) {
      product
        ? setProducts(data[queryBase].nodes)
        : setItems(data[queryBase].nodes)
    }
  }, [data, query, setItems])

  return (
    <div className="bg-white">
      <div className="pb-8 xl:max-w-7xl xl:mx-auto xl:px-8">
        <div className="px-8 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {header}
          </h2>
          {link && (
            <MenuLink
              href={link.path}
              className="hidden text-sm font-semibold text-blue-main hover:text-blue-dark sm:block"
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
                {items ? (
                  items.map(item => {
                    let image:
                      | { sourceUrl: string; altText: string }
                      | undefined = undefined

                    if (item.image?.sourceUrl) {
                      image = {
                        sourceUrl: item.image.sourceUrl,
                        altText: item.image.altText || "",
                      }
                    }

                    return (
                      <CarouselCard
                        name={item.name || ""}
                        slug={item.slug || ""}
                        image={image}
                        key={item.name || "" + item.slug}
                      />
                    )
                  })
                ) : products ? (
                  products.map(cardProduct => {
                    let image:
                      | { sourceUrl: string; altText: string }
                      | undefined = undefined

                    const path = `${
                      cardProduct.productCategories?.nodes![0]?.slug
                    }/${cardProduct.slug}`

                    if (cardProduct.image?.sourceUrl) {
                      image = {
                        sourceUrl: cardProduct.image.sourceUrl,
                        altText: cardProduct.image.altText || "",
                      }
                    }

                    return (
                      <CarouselCard
                        name={cardProduct.name || ""}
                        slug={path || ""}
                        image={image}
                        key={cardProduct.name || "" + cardProduct.slug}
                      />
                    )
                  })
                ) : (
                  <div className="ml-8 flex items-center h-64 justify-center text-gray-400">
                    Loading...
                    <div className="flip ml-2">
                      <RefreshIcon className="h-5 w-5 text-green-main animate-reverse-spin" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {link && (
          <div className="mt-6 px-8 sm:hidden">
            <MenuLink
              href={link.path}
              className="block text-sm font-semibold text-blue-main hover:text-blue-dark"
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

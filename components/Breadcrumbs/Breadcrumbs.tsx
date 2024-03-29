import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon"

import { ProductCategory } from "@api/codegen/graphql"

import Link from "@components/Link"

// ####
// #### Types
// ####

export type PropsType = {
  category: ProductCategory | null | undefined
  product?: boolean
  info?: boolean
}

// ####
// #### Component
// ####

const Breadcrumbs = ({
  category,
  product = false,
  info = false,
}: PropsType) => {
  return (
    <div className="border-b border-gray-200 w-screen">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl"
      >
        <ol
          role="list"
          className="flex items-center space-x-2 md:space-x-4 py-4"
        >
          <li>
            <div className="flex items-center">
              <Link
                href={"/products"}
                data-testid="shop-link"
                className="mr-2 md:mr-4 text-sm font-medium text-gray-900"
                title="View all products"
              >
                Shop
              </Link>
              <svg
                viewBox="0 0 6 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-auto text-gray-300"
              >
                <path
                  d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </li>
          {category?.ancestors?.nodes &&
            category?.ancestors.nodes.map((ancestor: ProductCategory) => {
              if (ancestor) {
                return (
                  <li key={ancestor.id}>
                    <div className="flex items-center">
                      <Link
                        href={`/products/${ancestor.slug}`}
                        data-testid={ancestor.name}
                        title={`View all ${category?.name} products`}
                        className="mr-2 md:mr-4 text-sm font-medium text-gray-900"
                      >
                        {ancestor.name}
                      </Link>
                      <svg
                        viewBox="0 0 6 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-auto text-gray-300"
                      >
                        <path
                          d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </li>
                )
              }
            })}
          <li className="text-sm">
            <div
              aria-current="page"
              className="flex items-center font-medium text-gray-500"
            >
              {product ? (
                <>
                  <Link
                    href={`/products/${category?.slug}`}
                    data-testid={category?.name}
                    title={`View all ${category?.name} products`}
                    className="transition hover:text-highlight"
                  >
                    {category?.name}
                  </Link>
                </>
              ) : info ? (
                <>
                  <Link
                    href={`/products/${category?.slug}`}
                    data-testid={category?.name}
                    title={`View all ${category?.name} products`}
                    className="transition hover:text-highlight"
                  >
                    {category?.name}
                    <span className="text-highlight pl-4">View products</span>
                  </Link>
                </>
              ) : (
                <>{category?.name}</>
              )}
            </div>
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs

import Link from "next/link"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { ProductCategory } from "@api/gql/types"

type BreadcrumbsProps = {
  category: ProductCategory
  product?: boolean
  info?: boolean
}

const Breadcrumbs = ({
  category,
  product = false,
  info = false,
}: BreadcrumbsProps) => {
  return (
    <div className="border-b border-gray-200 -ml-5 px-5 w-screen">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl"
      >
        <ol role="list" className="flex items-center space-x-4 py-4">
          <li>
            <div className="flex items-center">
              <Link href={"/products"} passHref>
                <a
                  className="mr-4 text-sm font-medium text-gray-900"
                  title="View all products"
                >
                  Shop
                </a>
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
          {category.ancestors?.nodes &&
            category.ancestors.nodes.map((ancestor, index) => {
              if (ancestor) {
                return (
                  <li key={ancestor.id}>
                    <div className="flex items-center">
                      <Link href={`/products/${ancestor.slug}`}>
                        <a
                          title={`View all ${category.name} products`}
                          className="mr-4 text-sm font-medium text-gray-900"
                        >
                          {ancestor.name}
                        </a>
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
                  <Link href={`/products/${category.slug}`}>
                    <a
                      title={`View all ${category.name} products`}
                      className="transition hover:text-green-main"
                    >
                      {category.name}
                    </a>
                  </Link>
                  <div className="ml-2 hover:text-green-main">
                    <Link href={`/products/${category.slug}/info`}>
                      <a title="Learn more">
                        <InformationCircleIcon className="h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                </>
              ) : info ? (
                <>
                  <Link href={`/products/${category.slug}`}>
                    <a
                      title={`View all ${category.name} products`}
                      className="transition hover:text-green-main"
                    >
                      {category.name}
                      <span className="text-green-main pl-4">
                        View products
                      </span>
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  {category.name}
                  <Link href={`/products/${category.slug}/info`}>
                    <a title="Learn more">
                      <InformationCircleIcon className="h-4 w-4 ml-2 hover:text-green-main" />
                    </a>
                  </Link>
                </>
              )}
            </div>
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs

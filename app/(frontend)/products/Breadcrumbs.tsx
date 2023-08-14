import type { Category, Product } from "payload/generated-types"

import Link from "@components/Link"

// ####
// #### Types
// ####

export type PropsType = {
  category?: Category | null | undefined
  breadcrumbs: Category["breadcrumbs"]
  product?: Product | null
  info?: boolean
}

// ####
// #### Component
// ####

const Breadcrumbs = ({
  category,
  product,
  info = false,
  breadcrumbs,
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
          {breadcrumbs &&
            breadcrumbs.map((breadcrumb, i) => {
              return (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <Link
                      href={breadcrumb.url ?? "/products"}
                      data-testid={breadcrumb.label}
                      title={`View all ${breadcrumb.label} products`}
                      className="mr-2 md:mr-4 text-sm font-medium text-gray-900 hover:text-accent transition-colors"
                    >
                      {breadcrumb.label}
                    </Link>
                    {(product || i < breadcrumbs.length - 1) && (
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
                    )}
                  </div>
                </li>
              )
            })}

          {product && (
            <li className="text-sm">
              <div
                aria-current="page"
                className="flex items-center font-medium text-gray-500"
              >
                <>
                  <div
                    data-testid={product?.title}
                    title={`View all ${product?.title} products`}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: product?.title ?? "",
                      }}
                    />
                  </div>
                </>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs

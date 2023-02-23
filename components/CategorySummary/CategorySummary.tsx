import { RefObject } from "react"

import { ProductCategory } from "@api/codegen/graphql"

import Link from "@components/Link"
import CategoryLink from "@components/CategoryLink"

// ####
// #### Types
// ####

export type PropsType = {
  category: ProductCategory
  productRef?: RefObject<HTMLDivElement>
}

// ####
// #### Component
// ####

const Summary = ({ category, productRef }: PropsType) => {
  return (
    <>
      <div
        className="pt-8 pb-8 px-8 mx-auto lg:max-w-7xl"
        data-testid="category-summary"
      >
        <div className="flex items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {category.name}
          </h1>
        </div>
        <p className="mt-4 text-base text-gray-500">{category.description}</p>
        {category.product_category?.acf?.description && (
          <p className="pt-2">
            <Link
              href={`/products/${category.slug}/info`}
              title="Learn more"
              className="text-gray-400 hover:text-green-main text-sm"
            >
              Learn more...
            </Link>
          </p>
        )}
      </div>
      {/* Sub-categories */}

      {category.children?.nodes && category.children.nodes.length > 0 && (
        <div
          className="px-8 text-gray-500 pb-8 mx-auto lg:max-w-7xl"
          data-testid="sub-categories"
        >
          <h2 className="font-bold text-2xl text-gray-900 uppercase flex items-center">
            Sub-Categories{" "}
            <span
              className="ml-4 text-sm inline md:hidden font-normal text-gray-400 normal-case cursor-pointer"
              data-testid="sub-categories-clickable-medium"
              onClick={() => {
                productRef?.current?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Scroll down for Products
            </span>
          </h2>

          <div
            className="text-sm md:hidden font-normal text-gray-400 normal-case cursor-pointer"
            data-testid="sub-categories-clickable-small"
            onClick={() => {
              productRef?.current?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Scroll down for Products
          </div>
          <div className="text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 mt-2">
              {category.children.nodes.map((subCategory: ProductCategory) => {
                if (subCategory) {
                  return (
                    <CategoryLink category={subCategory} key={subCategory.id} />
                  )
                }
              })}
            </div>
          </div>
        </div>
      )}

      <h2
        ref={productRef}
        className="max-w-7xl mx-auto px-8 pb-4 text-2xl font-bold text-gray-900 uppercase"
        data-testid="products-header"
      >
        Products
      </h2>
    </>
  )
}

export default Summary

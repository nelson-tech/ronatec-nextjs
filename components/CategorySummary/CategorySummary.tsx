import { Fragment, RefObject } from "react"

import { ProductCategory } from "@api/codegen/graphql"
import isServer from "@lib/utils/isServer"

import CategoryLink from "@components/CategoryLink"

// ####
// #### Types
// ####

export type PropsType = {
  category: ProductCategory | null | undefined
  productRef?: RefObject<HTMLDivElement>
  main?: boolean
}

// ####
// #### Component
// ####

const Summary = ({ category, productRef, main }: PropsType) => {
  return (
    <Fragment>
      {category?.name && (
        <div
          className="pt-8 pb-8 px-8 mx-auto lg:max-w-7xl"
          data-testid="category-summary"
        >
          <div className="flex items-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {category?.name}
            </h2>
            <span
              className="ml-4 text-sm inline font-normal text-gray-400 normal-case cursor-pointer"
              data-testid="sub-categories-clickable-medium"
              onClick={() => {
                if (!isServer) {
                  productRef?.current?.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Scroll down for Products
            </span>
          </div>
          <div
            className="mt-4 py-4 text-base text-gray-500 prose max-w-none prose-sm prose-a:text-accent hover:prose-a:text-highlight prose-p:mt-4"
            dangerouslySetInnerHTML={{ __html: category?.description ?? "" }}
          />
        </div>
      )}
      {/* Sub-categories */}

      {category?.children?.nodes && category?.children.nodes.length > 0 && (
        <div
          className="px-8 text-gray-500 pb-8 mx-auto lg:max-w-7xl"
          data-testid="sub-categories"
        >
          {!main && (
            <h4 className="font-bold text-2xl text-gray-900 uppercase tracking-wide flex items-center mb-2">
              Sub-Categories
            </h4>
          )}

          <div className="text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {category?.children.nodes.map((subCategory: ProductCategory) => {
                if (subCategory) {
                  return (
                    <CategoryLink
                      category={subCategory}
                      key={subCategory?.id}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Summary

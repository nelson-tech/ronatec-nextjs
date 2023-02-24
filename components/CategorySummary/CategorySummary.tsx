import { RefObject } from "react"

import { ProductCategory } from "@api/codegen/graphql"

import Link from "@components/Link"
import CategoryLink from "@components/CategoryLink"

// ####
// #### Types
// ####

export type PropsType = {
  category: ProductCategory | null | undefined
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
            {category?.name}
          </h1>
        </div>
        <div
          className="mt-4 text-base text-gray-500 prose max-w-none prose-sm prose-a:text-accent hover:prose-a:text-highlight prose-p:mt-4"
          dangerouslySetInnerHTML={{ __html: category?.description ?? "" }}
        />
      </div>
      {/* Sub-categories */}

      {category?.children?.nodes && category?.children.nodes.length > 0 && (
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
    </>
  )
}

export default Summary

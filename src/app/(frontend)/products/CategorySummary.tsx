import type { RefObject } from "react"

import isServer from "@utils/isServer"

// import CategoryLink from "~/components/CategoryLink"
import type { Category } from "~payload-types"

// ####
// #### Types
// ####

export type PropsType = {
  category: Category | null | undefined
  productRef?: RefObject<HTMLDivElement>
}

// ####
// #### Component
// ####

const CategorySummary = ({ category, productRef }: PropsType) => {
  return (
    <>
      {category?.title && (
        <div
          className="pt-8 pb-8 px-8 mx-auto lg:max-w-7xl"
          data-testid="category-summary"
        >
          <h2
            className="text-4xl w-full text-center font-extrabold tracking-tight text-gray-900"
            dangerouslySetInnerHTML={{ __html: category?.title }}
          ></h2>
        </div>
      )}
      {/* Sub-categories */}
    </>
  )
}

export default CategorySummary

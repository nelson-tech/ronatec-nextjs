import { RefObject } from "react"

import useStore from "@lib/hooks/useStore"
import { PaginationType } from "@lib/pagination"
import { WpPageInfo } from "@api/codegen/graphql"

// ####
// #### Types
// ####

type PropsType = {
  setPagination: (pagination: PaginationType) => void
  pageInfo: WpPageInfo
  productRef: RefObject<HTMLDivElement>
}

// ####
// #### Component
// ####

const Pagination = ({ pageInfo, setPagination, productRef }: PropsType) => {
  const productsPerPage = useStore((state) => state.shop.productsPerPage)

  const scrollIntoView = () => {
    window.scrollTo({
      behavior: "smooth",
      top:
        productRef.current!.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        55,
    })
  }

  const handleNext = () => {
    scrollIntoView()

    setPagination({
      first: productsPerPage,
      last: null,
      after: pageInfo.endCursor,
      before: null,
    })
  }

  const handlePrevious = () => {
    scrollIntoView()

    setPagination({
      first: null,
      last: productsPerPage,
      after: null,
      before: pageInfo.startCursor,
    })
  }
  return (
    <>
      <nav
        className="bg-white px-6 py-6 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="flex-1 flex justify-end mr-2">
          {pageInfo.hasPreviousPage && (
            <button
              onClick={handlePrevious}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {pageInfo.hasNextPage && (
            <button
              onClick={handleNext}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Pagination

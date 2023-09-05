import { RefObject } from "react"

import useStore from "@hooks/useStore"
import type { PaginatedDocs } from "payload/dist/mongoose/types"
import type { Product } from "~payload-types"

// ####
// #### Types
// ####

type PropsType = {
  setPage: (page: number) => void
  pageData: Omit<PaginatedDocs<Product>, "docs"> | null
  productRef: RefObject<HTMLDivElement>
}

// ####
// #### Component
// ####

const Pagination = ({ pageData, setPage, productRef }: PropsType) => {
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

    setPage((pageData?.page ?? 1) + 1)
  }

  const handlePrevious = () => {
    scrollIntoView()

    setPage((pageData?.page ?? 2) - 1)
  }

  return (
    <>
      <nav
        className="bg-white px-6 py-6 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="flex-1 flex justify-end mr-2">
          {pageData?.hasPrevPage && (
            <button
              onClick={handlePrevious}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {pageData?.hasNextPage && (
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

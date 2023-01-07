import { Fragment, RefObject } from "react"
import shallow from "zustand/shallow"
import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon"
import ViewGridIcon from "@heroicons/react/solid/ViewGridIcon"
import ViewListIcon from "@heroicons/react/solid/ViewListIcon"

import { sortOptions, SortOptionType } from "@lib/store/slices/shop"
import useStore from "@lib/hooks/useStore"
import { InputMaybe, ProductCategory } from "@api/codegen/graphql"

import Filters from "@components/Filters"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import AZIcon from "./Icons/AZ"
import ZAIcon from "./Icons/ZA"
import NewestIcon from "./Icons/Newest"
import OldestIcon from "./Icons/Oldest"

// ####
// #### Types
// ####

type PropsType = {
  loading: boolean
  filter?: boolean
  categories: ProductCategory[] | null
  productRef: RefObject<HTMLDivElement>
  selectedCategories: InputMaybe<string> | InputMaybe<string>[]
  setSelectedCategories: (
    categories: InputMaybe<string> | InputMaybe<string>[],
  ) => void
  setSelectedSort: (option: SortOptionType) => void
}

// ####
// #### Variables
// ####

// ####
// #### Component
// ####

const Sort = ({
  loading,
  filter,
  categories,
  productRef,
  selectedCategories,
  setSelectedCategories,
  setSelectedSort,
}: PropsType) => {
  const { selectedSort, viewMode, setViewMode } = useStore(
    state => ({
      selectedSort: state.shop.selectedSort,
      viewMode: state.shop.viewMode,
      setViewMode: state.shop.setViewMode,
    }),
    shallow,
  )

  const handleSort = async (option: SortOptionType) => {
    setSelectedSort(option)
  }

  let SortIcon = ChevronDownIcon

  const sectionClasses =
    "w-full border-t border-b border-gray-200 grid items-center"

  switch (selectedSort.name) {
    case "A - Z":
      SortIcon = AZIcon
      break
    case "Z - A":
      SortIcon = ZAIcon
      break
    case "Newest":
      SortIcon = NewestIcon
      break
    case "Oldest":
      SortIcon = OldestIcon
    default:
      break
  }

  const BaseSort = () => (
    <div className="col-start-1 row-start-1 py-4">
      <div className="flex justify-end items-center max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <Menu as="div" className="relative flex">
          <div className="flex">
            <Menu.Button
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none ring-transparent"
              disabled={selectedCategories?.length === 0}
            >
              <span className="sr-only">Sort options</span>Sort
              {loading ? (
                <LoadingSpinner
                  size={5}
                  color="#37b679"
                  opacity={100}
                  className="flex-shrink-0 -mr-1 ml-2"
                />
              ) : (
                <SortIcon
                  className="flex-shrink-0 -mr-1 ml-2 h-5 w-5 transition text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-bottom-right z-10 absolute mt-6 right-0 w-44 rounded-md shadow-2xl overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="">
                {sortOptions.map(option => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a
                        className={`outline-none ring-transparent ${
                          selectedSort.name === option.name
                            ? "bg-blue-main text-white"
                            : "text-gray-700 bg-white cursor-pointer hover:bg-gray-100"
                        } block px-4 py-2 text-sm font-medium`}
                        onClick={() => handleSort(option)}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
          <button
            type="button"
            className={`p-2 -m-2 ml-5 sm:ml-7 ${
              viewMode === "grid"
                ? "text-green-main"
                : "text-gray-400 hover:text-gray-500"
            }`}
            // disabled={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
          >
            <span className="sr-only">View grid</span>
            <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`p-2 -m-2 ml-5 sm:ml-7 ${
              viewMode === "list"
                ? "text-green-main"
                : "text-gray-400 hover:text-gray-500"
            }`}
            // disabled={viewMode === "list"}
            onClick={() => setViewMode("list")}
          >
            <span className="sr-only">View list</span>
            <ViewListIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </Menu>
      </div>
    </div>
  )

  return filter && categories ? (
    <Filters
      categories={categories}
      productRef={productRef}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    >
      <BaseSort />
    </Filters>
  ) : (
    <section className={sectionClasses} ref={productRef}>
      <BaseSort />
    </section>
  )
}

export default Sort

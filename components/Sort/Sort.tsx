import { Fragment } from "react"
import shallow from "zustand/shallow"
import { Menu, Transition } from "@headlessui/react"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon"
import ViewGridIcon from "@heroicons/react/solid/ViewGridIcon"
import ViewListIcon from "@heroicons/react/solid/ViewListIcon"

import { sortOptions, SortOptionType } from "@lib/store/slices/ui"
import useStore from "@lib/hooks/useStore"
import { ProductCategory } from "@api/gql/types"

import Filters from "@components/Filters"
import AZIcon from "./Icons/AZ"
import ZAIcon from "./Icons/ZA"
import NewestIcon from "./Icons/Newest"
import OldestIcon from "./Icons/Oldest"

// ####
// #### Types
// ####

type PropsType = {
  loading: boolean
  withFilter?: boolean
  categories: ProductCategory[] | null
  filteredCategories: string[]
  setFilteredCategories: (f: string[]) => void
}

// ####
// #### Variables
// ####

// ####
// #### Component
// ####

const Sort = ({
  loading,
  withFilter,
  categories,
  filteredCategories,
  setFilteredCategories,
}: PropsType) => {
  const { selectedSort, setSelectedSort, viewMode, setViewMode } = useStore(
    state => ({
      selectedSort: state.ui.selectedSort,
      setSelectedSort: state.ui.setSelectedSort,
      viewMode: state.ui.viewMode,
      setViewMode: state.ui.setViewMode,
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
              disabled={filteredCategories && filteredCategories.length === 0}
            >
              <span className="sr-only">Sort options</span>Sort
              {loading ? (
                <div className="flex-shrink-0 -mr-1 ml-2 flip transition">
                  <RefreshIcon
                    className="h-5 w-5 animate-reverse-spin text-green-main "
                    aria-hidden="true"
                  />
                </div>
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

  return withFilter &&
    categories &&
    filteredCategories &&
    setFilteredCategories ? (
    <Filters
      categories={categories}
      filteredCategories={filteredCategories}
      setFilteredCategories={setFilteredCategories}
    >
      <BaseSort />
    </Filters>
  ) : (
    <section className={sectionClasses}>
      <BaseSort />
    </section>
  )
}

export default Sort

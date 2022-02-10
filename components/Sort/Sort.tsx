import { Dispatch, Fragment, SetStateAction } from "react"
import dynamic from "next/dynamic"
import { Menu, Transition } from "@headlessui/react"
import {
  ChevronDownIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/solid"

import { ProductCategory } from "@api/gql/types"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Filters = dynamic(() => import("@components/Filters"), importOpts)

// ####
// #### Variables
// ####

export const sortOptions: SortOptionType[] = [
  { name: "Default", id: { field: "MENU_ORDER", order: "ASC" } },
  { name: "Price: Low to High", id: { field: "PRICE", order: "ASC" } },
  { name: "Price: High to Low", id: { field: "PRICE", order: "DESC" } },
  { name: "A - Z", id: { field: "SLUG", order: "ASC" } },
  { name: "Z - A", id: { field: "SLUG", order: "DESC" } },
  { name: "Newest", id: { field: "DATE", order: "DESC" } },
  { name: "Oldest", id: { field: "DATE", order: "ASC" } },
]

// ####
// #### Types
// ####

export type SortOptionType = {
  name: string
  id: { field: string; order: string }
}

type SortBaseProps = {
  viewMode: "grid" | "list"
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>
  selectedSort: SortOptionType
  handleSort: (option: SortOptionType) => Promise<void>
}

type FilterProps = SortBaseProps & {
  withFilter: true
  category: ProductCategory
  filteredCategories: string[]
  setFilteredCategories: Dispatch<SetStateAction<string[]>>
}

type SortProps =
  | (SortBaseProps & {
      withFilter?: false
      category?: never
      filteredCategories?: never
      setFilteredCategories?: never
    })
  | FilterProps

// ####
// #### Component
// ####

const Sort = ({
  viewMode,
  setViewMode,
  selectedSort,
  handleSort,
  withFilter,
  category,
  filteredCategories,
  setFilteredCategories,
}: SortProps) => {
  const sectionClasses =
    "w-screen border-t border-b border-gray-200 grid items-center"

  const BaseSort = () => (
    <div className="col-start-1 row-start-1 py-4">
      <div className="flex justify-end max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <Menu as="div" className="relative flex">
          <div className="flex">
            <Menu.Button
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none ring-transparent"
              disabled={filteredCategories && filteredCategories.length === 0}
            >
              <span className="sr-only">Sort options</span>Sort
              <ChevronDownIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
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
                  <Menu.Item
                    key={option.name}
                    onClick={() => handleSort(option)}
                  >
                    {({ active }) => (
                      <a
                        className={`outline-none ring-transparent ${
                          selectedSort.name === option.name
                            ? "bg-blue-main text-white"
                            : "text-gray-700 bg-white cursor-pointer hover:bg-gray-100"
                        } block px-4 py-2 text-sm font-medium`}
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
    category &&
    filteredCategories &&
    setFilteredCategories ? (
    <Filters
      category={category}
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

import { Fragment, RefObject } from "react"
import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"
import ViewGridIcon from "@heroicons/react/20/solid/ViewColumnsIcon"
import ViewListIcon from "@heroicons/react/20/solid/ListBulletIcon"

import { sortOptions, SortOptionType } from "@store/slices/shop"
import useStore from "@hooks/useStore"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import AZIcon from "./Icons/AZ"
import ZAIcon from "./Icons/ZA"
import NewestIcon from "./Icons/Newest"
import OldestIcon from "./Icons/Oldest"
import { Category } from "~payload-types"
import Link from "@components/Link"

// ####
// #### Types
// ####

type PropsType = {
  loading: boolean
  productRef: RefObject<HTMLDivElement>
  main?: boolean
  subCategories?: Category[] | null
  selectedCategories: (Category | null | undefined)[] | null | undefined
  selectedSort: SortOptionType | undefined
  setSelectedSort: (option: SortOptionType) => void
}

// ####
// #### Component
// ####

const Sort = ({
  loading,
  productRef,
  main,
  subCategories,
  selectedCategories,
  selectedSort,
  setSelectedSort,
}: PropsType) => {
  const { viewMode, setViewMode } = useStore((state) => ({
    viewMode: state.shop.viewMode,
    setViewMode: state.shop.setViewMode,
  }))

  const handleSort = async (option: SortOptionType) => {
    setSelectedSort(option)
  }

  let SortIcon: any = ChevronDownIcon

  switch (selectedSort?.name) {
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
      break
    default:
      break
  }

  return (
    <section
      className={`w-full${
        main ? "" : " border-t"
      } border-b border-gray-200 grid items-center`}
      ref={productRef}
    >
      <div className="col-start-1 row-start-1 py-2">
        <div
          className={`flex ${
            (subCategories?.length ?? 0) > 0 ? "justify-between" : "justify-end"
          } md:justify-end items-center max-w-7xl mx-auto px-8`}
        >
          {(subCategories?.length ?? 0) > 0 ? (
            <Menu as="div" className="relative flex md:hidden">
              {({ open }) => (
                <>
                  {" "}
                  <Menu.Button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none ring-transparent"
                    disabled={
                      Array.isArray(selectedCategories) &&
                      selectedCategories?.length === 0
                    }
                  >
                    <span className="sr-only">Categories</span>
                    {main ? "Categories" : "Sub Categories"}

                    <ChevronDownIcon
                      className={`ml-2 h-5 w-5 ${
                        open ? "rotate-180" : "rotate-0"
                      } transition-all text-gray-400 group-hover:text-gray-500`}
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-bottom-right divide-y z-20 w-72 absolute mt-6 bg-white rounded shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {subCategories?.map((category) => (
                        <Menu.Item
                          key={category.id}
                          as={Link}
                          href={`/products/${category.slug}`}
                          className="outline-none ring-transparent text-gray-700 hover:bg-gray-100
                      hover:tracking-widest transition-all block px-4 py-2 text-sm font-medium"
                        >
                          {category.title}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          ) : (
            <></>
          )}

          <Menu
            as="div"
            className={`relative flex justify-center items-center`}
          >
            {({ open }) => (
              <>
                <Menu.Button
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none ring-transparent"
                  disabled={
                    Array.isArray(selectedCategories) &&
                    selectedCategories?.length === 0
                  }
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
                      className={`ml-2 h-5 w-5 ${
                        open ? "rotate-180" : "rotate-0"
                      } transition-all text-gray-400 group-hover:text-gray-500`}
                      aria-hidden="true"
                    />
                  )}
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-bottom-right z-10 absolute mt-6 top-0 right-0 w-44 rounded shadow-2xl overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        <div
                          className={`outline-none ring-transparent ${
                            selectedSort?.name === option.name
                              ? "bg-blue-main text-white"
                              : "text-gray-700 bg-white cursor-pointer hover:bg-gray-100"
                          } block px-4 py-2 text-sm font-medium transition-colors`}
                          onClick={() => handleSort(option)}
                        >
                          {option.name}
                        </div>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>

                <button
                  type="button"
                  className={`p-2 -m-2 ml-5 sm:ml-7 ${
                    viewMode === "grid"
                      ? "text-highlight"
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
                      ? "text-highlight"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                  // disabled={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                >
                  <span className="sr-only">View list</span>
                  <ViewListIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}
          </Menu>
        </div>
      </div>
    </section>
  )
}

export default Sort

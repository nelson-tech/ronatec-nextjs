import { FormEvent, ReactNode, RefObject } from "react"
import { Disclosure } from "@headlessui/react"
import { useForm } from "react-hook-form"
import XIcon from "@heroicons/react/20/solid/XCircleIcon"
import FilterIcon from "@heroicons/react/20/solid/FunnelIcon"

import { InputMaybe, ProductCategory } from "@api/codegen/graphql"

// ####
// #### Types
// ####

export type PropsType = {
  children: ReactNode
  categories: ProductCategory[]
  productRef: RefObject<HTMLDivElement>
  selectedCategories: InputMaybe<string> | InputMaybe<string>[]
  setSelectedCategories: (categories: string[]) => void
}

// ####
// #### Component
// ####

const Filters = ({
  children,
  categories,
  productRef,
  selectedCategories,
  setSelectedCategories,
}: PropsType) => {
  const defaultFilteredCategories = categories
    .map((category) => {
      let filteredCategories = [category.slug]

      category?.children?.nodes &&
        category.children.nodes.map((child: ProductCategory) => {
          let childCategories = [child?.slug]

          child?.children?.nodes &&
            child.children.nodes.map((grandchild: ProductCategory) => {
              childCategories.push(grandchild?.slug)
            })

          filteredCategories = filteredCategories.concat(childCategories)
        })

      return filteredCategories.flat().filter((a) => !!a)
    })
    .flat() as string[]

  const categoryList = selectedCategories ?? defaultFilteredCategories

  const { register, getValues } = useForm()

  const handleChange = () => {
    const selected = Object.values(getValues()).filter((v) => v)
    setSelectedCategories(selected)
  }

  const CategoryItem = ({ category }: { category: ProductCategory }) => {
    if (category.slug) {
      return (
        <div
          className="flex items-center w-full text-base sm:text-sm"
          ref={productRef}
        >
          <input
            id={`category-${category.slug}`}
            defaultValue={category.slug}
            type="checkbox"
            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-blue-main focus:ring-blue-main"
            defaultChecked={categoryList.includes(`${category.slug}`)}
            data-testid={`${category.name}-input`}
            {...register(`category-${category.slug}`)}
          />
          <label
            htmlFor={`category-${category.slug}`}
            className="ml-3 min-w-0 w-full flex-1 text-gray-600"
          >
            {/* {child && "- "}
            {grandchild && "- - "} */}
            {category.name}
          </label>
        </div>
      )
    }
    return <div data-testid="categories-error"></div>
  }

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative w-screen border-t border-b border-gray-200 grid items-center"
      data-testid="filters"
    >
      {({ open }) => {
        return (
          <>
            <h2 id="filter-heading" className="sr-only">
              Filters
            </h2>
            <div className="relative col-start-1 row-start-1 py-4">
              <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                <div>
                  <Disclosure.Button
                    className="group text-gray-700 font-medium flex items-center"
                    data-testid="filters-button"
                  >
                    {open ? (
                      <XIcon
                        className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <FilterIcon
                        className={`flex-none w-5 h-5 mr-2 group-hover:text-gray-500 ${
                          categoryList.length > 0
                            ? " text-highlight"
                            : " text-red-main"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    Select Categories
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel
              className="border-t border-gray-200 z-10 py-6"
              as={"menu"}
              onChange={handleChange}
            >
              {categories && (
                <>
                  <fieldset>
                    <div className="max-w-7xl mx-auto gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-2">
                        {categories.map((category) => {
                          return (
                            <div key={category.id}>
                              <CategoryItem category={category} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </fieldset>
                </>
              )}
            </Disclosure.Panel>
            {children}
          </>
        )
      }}
    </Disclosure>
  )
}

export default Filters

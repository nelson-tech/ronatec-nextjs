import { FormEvent, ReactNode } from "react"
import { Disclosure } from "@headlessui/react"
import XIcon from "@heroicons/react/solid/XIcon"
import FilterIcon from "@heroicons/react/solid/FilterIcon"
import { useForm } from "react-hook-form"

import { ProductCategory } from "@api/gql/types"

type FiltersProps = {
  children: ReactNode
  filteredCategories: string[]
  setFilteredCategories: (f: string[]) => void
  categories: ProductCategory[]
}

const Filters = ({
  children,
  filteredCategories,
  setFilteredCategories,
  categories,
}: FiltersProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const handleChange = (event: FormEvent<HTMLFieldSetElement>) => {
    const selected = Object.values(getValues()).filter(v => v)
    setFilteredCategories(selected)
  }

  const CategoryItem = ({
    category,
    child,
    grandchild,
  }: {
    category: ProductCategory
    child?: boolean
    grandchild?: boolean
  }) => {
    if (category.slug) {
      return (
        <div
          className={`flex items-center w-full text-base sm:text-sm${
            child && " pl-4 py-2 "
          }${grandchild && " pl-8 "}`}
        >
          <input
            id={`category-${category.slug}`}
            defaultValue={category.slug}
            type="checkbox"
            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-blue-main focus:ring-blue-main"
            defaultChecked={filteredCategories.includes(`${category.slug}`)}
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
    return <></>
  }

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative w-screen border-t border-b border-gray-200 grid items-center"
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
                  <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                    {open ? (
                      <XIcon
                        className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <FilterIcon
                        className={`flex-none w-5 h-5 mr-2 group-hover:text-gray-500 ${
                          filteredCategories.length > 0
                            ? " text-green-main"
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
                        {categories.map(category => {
                          return (
                            <div key={category.id}>
                              <CategoryItem category={category} />

                              {/* {category.children?.nodes &&
                                category.children.nodes.length > 0 &&
                                category.children.nodes.map(subCategory => {
                                  if (subCategory?.slug) {
                                    return (
                                      <div key={subCategory.id}>
                                        <CategoryItem
                                          category={subCategory}
                                          child
                                        />
                                        {subCategory?.children?.nodes &&
                                          subCategory.children.nodes.length >
                                            0 &&
                                          subCategory.children.nodes.map(
                                            subSubCategory => {
                                              if (subSubCategory?.slug) {
                                                return (
                                                  <CategoryItem
                                                    category={subSubCategory}
                                                    grandchild
                                                  />
                                                )
                                              }
                                            },
                                          )}
                                      </div>
                                    )
                                  }
                                })} */}
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

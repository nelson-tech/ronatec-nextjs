import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from "react"
import { Disclosure } from "@headlessui/react"
import { FilterIcon, XIcon } from "@heroicons/react/solid"
import { useForm } from "react-hook-form"
import { ProductCategory } from "@api/gql/types"

const filters = {
  price: [
    { value: "0", label: "$0 - $25", checked: false },
    { value: "25", label: "$25 - $50", checked: false },
    { value: "50", label: "$50 - $75", checked: false },
    { value: "75", label: "$75+", checked: false },
  ],
  color: [
    { value: "white", label: "White", checked: false },
    { value: "beige", label: "Beige", checked: false },
    { value: "blue", label: "Blue", checked: true },
    { value: "brown", label: "Brown", checked: false },
    { value: "green", label: "Green", checked: false },
    { value: "purple", label: "Purple", checked: false },
  ],
  size: [
    { value: "xs", label: "XS", checked: false },
    { value: "s", label: "S", checked: true },
    { value: "m", label: "M", checked: false },
    { value: "l", label: "L", checked: false },
    { value: "xl", label: "XL", checked: false },
    { value: "2xl", label: "2XL", checked: false },
  ],
  category: [
    { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
    { value: "tees", label: "Tees", checked: false },
    { value: "objects", label: "Objects", checked: false },
    { value: "sweatshirts", label: "Sweatshirts", checked: false },
    { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
  ],
}

type FiltersProps = {
  children: ReactNode
  filteredCategories: string[]
  setFilteredCategories: Dispatch<SetStateAction<string[]>>
  category: ProductCategory
}

const Filters = ({
  children,
  filteredCategories,
  setFilteredCategories,
  category,
}: FiltersProps) => {
  const [filtersCount, setFiltersCount] = useState(() => {
    let count = 1
    if (category.children?.nodes) {
      count += category.children.nodes.length
      category.children.nodes.map(child => {
        if (child?.children?.nodes) {
          count += child.children.nodes.length
        }
      })
    }
    return count
  })

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const handleChange = (event: FormEvent<HTMLFieldSetElement>) => {
    const selected = Object.values(getValues()).filter(v => v)
    setFiltersCount(selected.length)
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
          className={`flex items-center text-base sm:text-sm${
            child && " pl-4"
          }${grandchild && " pl-8"}`}
        >
          <input
            id={`category-${category.slug}`}
            defaultValue={category.slug}
            type="checkbox"
            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-blue-main focus:ring-blue-main"
            defaultChecked={filteredCategories.includes(
              `category-${category.slug}`,
            )}
            {...register(`category-${category.slug}`)}
          />
          <label
            htmlFor={`category-${category.slug}`}
            className="ml-3 min-w-0 flex-1 text-gray-600"
          >
            {child && "- "}
            {grandchild && "- - "}
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
      className="relative w-screen -ml-5 z-10 border-t border-b border-gray-200 grid items-center"
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
                          filtersCount > 0
                            ? " text-green-main"
                            : " text-red-main"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    Select Categories{" "}
                    {/* <span
                      className={`pl-2 ${
                        filtersCount > 0 ? "text-gray-400" : "text-red-main"
                      }`}
                    >
                      ({filtersCount} Selected)
                    </span> */}
                  </Disclosure.Button>
                </div>
                {/* <div className="pl-6">
            <button type="button" className="text-gray-500">
              Clear all
            </button>
          </div> */}
              </div>
            </div>
            <Disclosure.Panel
              className="border-t border-gray-200 py-6"
              as={"menu"}
              onChange={handleChange}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                  {/* <fieldset>
              <legend className="block font-medium">Price</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filters.price.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`price-${optionIdx}`}
                      name="price[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`price-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset> */}
                  {/* <fieldset>
              <legend className="block font-medium">Color</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filters.color.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`color-${optionIdx}`}
                      name="color[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`color-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Size</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filters.size.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`size-${optionIdx}`}
                      name="size[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`size-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset> */}
                  {category && category.slug && (
                    <fieldset>
                      <legend className="block font-medium">Category</legend>
                      <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                        <CategoryItem category={category} />
                        {category.children?.nodes &&
                          category.children.nodes.length > 0 &&
                          category.children.nodes.map(subCategory => {
                            if (subCategory?.slug) {
                              return (
                                <>
                                  <CategoryItem category={subCategory} child />
                                  {subCategory?.children?.nodes &&
                                    subCategory.children.nodes.length > 0 &&
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
                                </>
                              )
                            }
                          })}
                      </div>
                    </fieldset>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
            {children}
          </>
        )
      }}
    </Disclosure>
  )
}

export default Filters

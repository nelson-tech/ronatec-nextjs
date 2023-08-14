import { ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import CheckIcon from "@heroicons/react/20/solid/CheckIcon"
import { Combobox, Transition } from "@headlessui/react"

import useSearch from "@hooks/useSearch"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import { Product } from "payload/generated-types"

// ####
// #### Types
// ####

type PropsType = {
  setModalClosed?: (value: boolean) => void
}

// ####
// #### Component
// ####

const SearchForm = ({ setModalClosed }: PropsType) => {
  const router = useRouter()

  const { results, loading, getSearchResults } = useSearch()

  const handleSearchField = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const search = event.target.value
    getSearchResults(search)
  }

  const handleChange = (product: Product | undefined) => {
    if (product) {
      setModalClosed && setModalClosed(false)

      const firstCategory = product.categories?.at(0)
      const categorySlug =
        typeof firstCategory === "object" ? firstCategory.slug : ""
      router.push(`/products/${categorySlug}/${product.slug}`)
    }
  }

  return (
    <div className="inline-block my-6 w-full pb-60 text-left align-middle">
      <div>
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-700">
          Search Products
        </h2>
      </div>
      <Combobox
        as="div"
        value={undefined}
        onChange={handleChange}
        className="h-fit"
      >
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded border border-gray-300 bg-white py-2 pl-3 pr-10
            ring-0 ring-transparent focus:ring-accent focus:border-accent focus:outline-none sm:text-sm"
            onChange={handleSearchField}
            placeholder="Product Name"
            displayValue={(product: any) => product?.name ?? ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 ring-transparent focus:outline-none">
            {loading && <LoadingSpinner size={5} opacity={50} />}
          </Combobox.Button>

          {results && results.length > 0 && (
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Combobox.Options
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-base
                shadow-lg ring-transparent focus:outline-none sm:text-sm"
              >
                {results.map((product) => (
                  <Combobox.Option
                    key={product?.id}
                    value={product}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-8 pr-4 ring-transparent focus:outline-none 
                        ${active ? "bg-accent text-white" : "text-gray-900"}`
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : ""
                          }
                          `}
                          dangerouslySetInnerHTML={{
                            __html: product?.title ?? "",
                          }}
                        ></span>

                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-1.5 ${
                              active ? "text-white" : "text-accent"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          )}
        </div>
      </Combobox>
    </div>
  )
}

export default SearchForm

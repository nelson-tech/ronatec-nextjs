import { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"
import { gql, useApolloClient } from "@apollo/client"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"
import { CheckIcon } from "@heroicons/react/solid"
import { Combobox, Transition } from "@headlessui/react"

import { Product } from "@api/gql/types"

const searchQuery = gql`
  query QuickSearchQuery($search: String) {
    products(where: { search: $search }) {
      nodes {
        id
        slug
        name
        productCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
`

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const SearchForm = ({
  setModalClosed,
}: {
  setModalClosed?: (value: boolean) => void
}) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Product[] | undefined>()

  const router = useRouter()
  const apolloClient = useApolloClient()

  const handleSearchField = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const search = event.target.value
    setQuery(search)
    setLoading(true)

    const { data, error } = await apolloClient.query({
      query: searchQuery,
      variables: { search },
      errorPolicy: "all",
    })

    data.products?.nodes && setResults(data.products.nodes)

    setLoading(false)
  }

  const handleChange = (product: Product | undefined) => {
    if (product) {
      setModalClosed && setModalClosed(false)
      router.push(
        `/products/${
          product.productCategories?.nodes &&
          product.productCategories.nodes[0]?.slug
        }/${product.slug}`,
      )
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
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm ring-transparent focus:outline-none sm:text-sm"
            onChange={handleSearchField}
            placeholder="Product Name"
            displayValue={(product: Product) => product.name || ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 ring-transparent focus:outline-none">
            {loading && (
              <RefreshIcon
                className="h-5 w-5 text-gray-400 animate-reverse-spin"
                aria-hidden="true"
              />
            )}
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
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-transparent focus:outline-none sm:text-sm">
                {results.map(product => (
                  <Combobox.Option
                    key={product.id}
                    value={product}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-pointer select-none py-2 pl-8 pr-4 ring-transparent focus:outline-none ",
                        active ? "bg-blue-main text-white" : "text-gray-900",
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected && "font-semibold",
                          )}
                        >
                          {product.name}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 left-0 flex items-center pl-1.5",
                              active ? "text-white" : "text-blue-main",
                            )}
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

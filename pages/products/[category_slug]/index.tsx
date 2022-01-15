import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Link from "next/link"
import { gql, useApolloClient } from "@apollo/client"
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react"
import { InformationCircleIcon, XIcon } from "@heroicons/react/outline"
import {
  ChevronDownIcon,
  FilterIcon,
  PlusSmIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/solid"
import { ParsedUrlQuery } from "querystring"
import {
  default as parse,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"

import { Maybe, Product, ProductCategory } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getCategoryFromSlug,
  getCategorySlugs,
  getProductsByCategory,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"

import { Image } from "@components"
import { LoadingDots } from "@components/ui"

const sortOptions = [
  { name: "Default", id: { field: "MENU_ORDER", order: "ASC" } },
  { name: "Price: Low to High", id: { field: "PRICE", order: "ASC" } },
  { name: "Price: High to Low", id: { field: "PRICE", order: "DESC" } },
  { name: "A - Z", id: { field: "SLUG", order: "ASC" } },
  { name: "Z - A", id: { field: "SLUG", order: "DESC" } },
  { name: "Newest", id: { field: "DATE", order: "DESC" } },
  { name: "Oldest", id: { field: "DATE", order: "ASC" } },
]

const CategoryPage = ({
  category,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)

  const apolloClient = useApolloClient()

  const [products, setProducts] = useState<Maybe<Product>[] | null | undefined>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Default")
  const [viewMode, setViewMode] = useState("grid")
  const [currentCategory, setCurrentCategory] = useState("")

  useEffect(() => {
    if (currentCategory !== category.slug) {
      setProducts(category.products?.nodes)
      setCurrentCategory(category.slug!)
      console.log("UPDATE!", currentCategory)
    }
    return () => {
      // setProducts(null)
      // setCurrentCategory("")
    }
  }, [category, products, currentCategory])

  const handleSort = async (option: {
    name: string
    id: { field: string; order: string }
  }) => {
    setLoading(true)

    if (selectedSort !== option.name) {
      setSelectedSort(option.name)

      const { field, order } = option.id

      const { data, error, loading } = await apolloClient.query({
        query: getProductsByCategory,
        variables: { field, order, category: category.slug },
        errorPolicy: "all",
      })
      console.log(data)
      if (data) {
        data.products?.nodes && setProducts(data.products.nodes)
      }

      if (error) {
        console.log("ERROR", error)
        setProducts(category.products?.nodes)
        // TODO - Add alert on front-end
      }
    }

    setLoading(false)
  }

  if (category) {
    return (
      <>
        <Breadcrumbs category={category} />
        <div className="pt-16 pb-8 px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {category.name}
          </h1>
          <p className="mt-4 text-base text-gray-500">{category.description}</p>
          <p className="pt-2">
            <Link href={`/products/${category.slug}/info`} passHref>
              <a
                title="Learn more"
                className="text-gray-400 hover:text-green-main text-sm"
              >
                Learn more...
              </a>
            </Link>
          </p>
        </div>

        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="w-screen -ml-5 relative z-10 border-t border-b border-gray-200 grid items-center"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          {/* <div className="relative col-start-1 row-start-1 py-4">
            <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                  <FilterIcon
                    className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  2 Filters
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button type="button" className="text-gray-500">
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
                <fieldset>
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
                </fieldset>
                <fieldset>
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
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                    {filters.category.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`category-${optionIdx}`}
                          name="category[]"
                          defaultValue={option.value}
                          type="checkbox"
                          className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          defaultChecked={option.checked}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel> */}
          <div className="col-start-1 row-start-1 py-4">
            <div className="flex justify-end max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none ring-transparent">
                    Sort
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-2xl overflow-hidden bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="">
                      {sortOptions.map(option => (
                        <Menu.Item
                          key={option.name}
                          onClick={() => handleSort(option)}
                        >
                          {({ active }) => (
                            <a
                              className={`outline-none ring-transparent ${
                                selectedSort === option.name
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
              </Menu>
              <button
                type="button"
                className={`p-2 -m-2 ml-5 sm:ml-7 ${
                  viewMode === "grid"
                    ? "text-green-main"
                    : "text-gray-400 hover:text-gray-500"
                }`}
                disabled={viewMode === "grid"}
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
                disabled={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                <span className="sr-only">View list</span>
                <ViewListIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Disclosure>

        {loading ? (
          <div className="pt-12 pb-24">
            <div className="flex items-center flex-col space-y-8">
              <div className="font-bold">Fetching products...</div>
              <div>
                <LoadingDots />
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 px-4">
                {products &&
                  products.map(baseProduct => {
                    const product = baseProduct as Product & { price?: string }
                    if (product) {
                      if (viewMode === "grid") {
                        return (
                          <ProductCard
                            product={product}
                            category_slug={category.slug || ""}
                          />
                        )
                      } else if (viewMode === "list") {
                        return (
                          <div className="group relative">
                            <Link
                              href={`/products/${category.slug}/${product.slug}`}
                              passHref
                            >
                              <a
                                title={product.name || ""}
                                className="flex flex-col"
                              >
                                <div className="font-bold text-gray-900 group-hover:text-blue-main text-xl">
                                  {product.name}
                                </div>
                                <div className=" text-gray-600 py-2">
                                  {parse(product.shortDescription || "")}
                                </div>
                                <span className="text-sm font-medium text-gray-400">
                                  {product.price}
                                </span>
                              </a>
                            </Link>
                          </div>
                        )
                      }
                    }
                  })}
              </div>
            </section>
          </div>
        )}
      </>
    )
  }
  return <div>No category found.</div>
}

const ProductCard = ({
  product,
  category_slug,
}: {
  product: Product & { price?: string }
  category_slug: string
}) => {
  return (
    <div
      key={product.id}
      className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
    >
      {product.image && product.image.sourceUrl && (
        <div className="bg-gray-200 group-hover:opacity-75">
          <div className="w-full h-full object-center object-cover sm:w-full sm:h-full aspect-square relative">
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || ""}
              width={product.image.mediaDetails?.width}
              height={product.image.mediaDetails?.height}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      )}
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${category_slug}/${product.slug}`} passHref>
            <a title={product.name || ""} className="flex flex-col">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </Link>
        </h3>
        {product.shortDescription && (
          <p className="text-sm text-gray-500">
            {parse(product.shortDescription)}
          </p>
        )}
        <div className="flex-1 flex flex-col justify-end">
          {/* <p className="text-sm italic text-gray-500">{product.options}</p> */}
          <p className="text-base font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  )
}

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
export default CategoryPage

const Breadcrumbs = ({ category }: { category: ProductCategory }) => {
  return (
    <div className="border-b border-gray-200">
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <ol role="list" className="flex items-center space-x-4 py-4">
          <li>
            <div className="flex items-center">
              <a
                href={"/products"}
                className="mr-4 text-sm font-medium text-gray-900"
              >
                Shop
              </a>
              <svg
                viewBox="0 0 6 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-auto text-gray-300"
              >
                <path
                  d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </li>
          {category.ancestors?.nodes &&
            category.ancestors.nodes.map((ancestor, index) => {
              if (ancestor) {
                return (
                  <li key={ancestor.id}>
                    <div className="flex items-center">
                      <a
                        href={`/products/${ancestor.slug}`}
                        className="mr-4 text-sm font-medium text-gray-900"
                      >
                        {ancestor.name}
                      </a>
                      <svg
                        viewBox="0 0 6 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-auto text-gray-300"
                      >
                        <path
                          d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </li>
                )
              }
            })}
          <li className="text-sm">
            <div
              aria-current="page"
              className="flex items-center font-medium text-gray-500"
            >
              {category.name}
              <Link href={`/products/${category.slug}/info`}>
                <a title="Learn more">
                  <InformationCircleIcon className="h-4 w-4 ml-2 hover:text-green-main" />
                </a>
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  )
}

interface IParams extends ParsedUrlQuery {
  category_slug: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { category_slug } = context.params as IParams

  const client = initializeApollo({})

  const {
    data: { productCategory: category },
    loading,
    error,
  }: CategoryReturnType = await client.query({
    query: getCategoryFromSlug,
    variables: {
      id: category_slug,
    },
    errorPolicy: "all",
  })

  const {
    data: { menu },
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems, category },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({})

  const {
    data: { productCategories },
  }: CategoriesReturnType = await client.query({ query: getCategorySlugs })
  type Path = {
    params: IParams
  }
  let paths: Path[] = []
  productCategories &&
    productCategories.nodes &&
    productCategories.nodes.map(category => {
      paths.push({ params: { category_slug: category.slug! } })
    })

  return {
    paths,
    fallback: true,
  }
}

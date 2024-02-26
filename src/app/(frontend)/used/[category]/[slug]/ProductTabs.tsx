"use client"

import { Tab } from "@headlessui/react"
import type { Product } from "~payload-types"
import ProductAttributes from "./ProductAttributes"
import Serialize from "@components/Serialize"

type ProductTabsProps = {
  product: Product | null | undefined
}

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// TODO: Add screen size state to manage vertical prop for accessibility

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabStyling = ({ selected }) =>
    classNames(
      "w-full rounded py-2.5 text-sm  leading-5 text-accent",
      "ring-white ring-opacity-60 ring-offset-1 ring-offset-transparent tracking-wide font-bold focus:outline-none focus:ring-1",
      selected
        ? "bg-white shadow text-gray-500"
        : "text-gray-400 hover:bg-white/[0.3] hover:text-gray-500 transition-all"
    )

  return (
    <div id="product-tabs" className="">
      {/* <Tab.Group>
        <Tab.List className="flex flex-col md:flex-row p-2 rounded bg-accent/10">
          <Tab className={({ selected }) => tabStyling({ selected })}>
            Description
          </Tab>
          <Tab className={({ selected }) => tabStyling({ selected })}>More</Tab>
        </Tab.List>

        <Tab.Panels className="prose mt-8 max-w-none text-gray-600">
          <Tab.Panel> */}
      {product?.description ? (
        <div className="prose mt-8 max-w-none [&>p>iframe]:w-full">
          <Serialize lexical={product.description} />
        </div>
      ) : (
        product?.wc?.description && (
          <div
            id="product-description"
            className="prose mt-8 max-w-none [&>p>iframe]:w-full"
            dangerouslySetInnerHTML={{
              __html: product?.description || product?.wc?.description,
            }}
          >
            {/* {parse(
        product?.description ?? product?.wc?.description,
        htmlParserOptions
      )} */}
          </div>
        )
      )}
      <ProductAttributes product={product} />
      {/* </Tab.Panel>
          <Tab.Panel>More stuff</Tab.Panel>
        </Tab.Panels>
      </Tab.Group> */}
    </div>
  )
}

export default ProductTabs

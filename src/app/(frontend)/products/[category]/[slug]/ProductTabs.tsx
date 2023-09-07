"use client"

import { Tab } from "@headlessui/react"
import type { Product } from "~payload-types"
import ProductAttributes from "./ProductAttributes"

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
      "w-full rounded py-2.5 text-sm font-medium leading-5 text-accent",
      "ring-white ring-opacity-60 ring-offset-1 ring-offset-transparent focus:outline-none focus:ring-1",
      selected
        ? "bg-white shadow text-highlight"
        : "text-accent hover:bg-white/[0.2] hover:text-highlight transition-all"
    )

  return (
    <>
      {/* <Tab.Group>
        <Tab.List className="flex flex-col md:flex-row p-2 rounded bg-accent/10">
          <Tab className={({ selected }) => tabStyling({ selected })}>
            Description
          </Tab>
          <Tab className={({ selected }) => tabStyling({ selected })}>More</Tab>
        </Tab.List>

        <Tab.Panels className="prose mt-8 max-w-none">
          <Tab.Panel> */}
      {product?.description ||
        (product?.wc?.description && (
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
        ))}
      {/* <ProductAttributes product={product} />
          </Tab.Panel>
          <Tab.Panel>More stuff</Tab.Panel>
        </Tab.Panels>
      </Tab.Group> */}
    </>
  )
}

export default ProductTabs

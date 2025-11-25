import { NextRequest, NextResponse } from "next/server"
import { Product, ProductAttributes, WCImages } from "~payload-types"
import getPayloadClient from "~payload/payloadClient"
import wp from "./wp.json"
import { Options } from "payload/dist/collections/operations/local/find"
import { Where } from "payload/types"
import formatSlug from "~payload/utils/formatSlug"
import findMatchingWCIds from "src/app/webhooks/wordpress/utils/findMatchingWCIds"
import { PaginatedDocs } from "payload/dist/database/types"

const example = {
  ID: 323,
  Type: "simple",
  SKU: "AC2065",
  Name: "LeRoi 25 HP Air Compressor AC2065",
  Published: 1,
  "Is featured?": 0,
  "Visibility in catalog": "visible",
  "Short description":
    'OAD: 89"L x 37"W x 56"H. Wired for 460 volt. 12,724 hours. LeRoi pump model: A219-79. Serial Number: 4078X902. Tested.',
  Description:
    "LeRoi 25 HP Air Compressor AC2065\n\\n\n\\nhttps://www.youtube.com/watch?v=dgXTFHevTgk&amp;t=6s",
  "Date sale price starts": "",
  "Date sale price ends": "",
  "Tax status": "taxable",
  "Tax class": "",
  "In stock?": 0,
  Stock: 0,
  "Low stock amount": "",
  "Backorders allowed?": 0,
  "Sold individually?": 0,
  "Weight (lbs)": 9999,
  "Length (in)": "",
  "Width (in)": "",
  "Height (in)": "",
  "Allow customer reviews?": 0,
  "Purchase note": "",
  "Sale price": "",
  "Regular price": 4950,
  Categories: "Air Compressors",
  Tags: "",
  "Shipping class": "",
  Images:
    "https://lanco-corp.com/wp-content/uploads/2021/03/AC2065C.jpg, https://lanco-corp.com/wp-content/uploads/2021/03/AC2065.jpg, https://lanco-corp.com/wp-content/uploads/2021/03/AC2065A.jpg, https://lanco-corp.com/wp-content/uploads/2021/03/AC2065B.jpg, https://lanco-corp.com/wp-content/uploads/2021/03/AC2065D.jpg, https://lanco-corp.com/wp-content/uploads/2021/03/AC2065E.jpg",
  "Download limit": "",
  "Download expiry days": "",
  Parent: "",
  "Grouped products": "",
  Upsells: "",
  "Cross-sells": "",
  "External URL": "",
  "Button text": "",
  Position: 866,
  "Attribute 1 name": "inventory",
  "Attribute 1 value(s)": "AC2065",
  "Attribute 1 visible": 1,
  "Attribute 1 global": 1,
  "Attribute 2 name": "Manufacturer",
  "Attribute 2 value(s)": "Leroi",
  "Attribute 2 visible": 1,
  "Attribute 2 global": 0,
  "Attribute 3 name": "Model",
  "Attribute 3 value(s)": "T25SS",
  "Attribute 3 visible": 1,
  "Attribute 3 global": 0,
  "Attribute 4 name": "HP",
  "Attribute 4 value(s)": 25,
  "Attribute 4 visible": 1,
  "Attribute 4 global": 0,
  "Attribute 5 name": "CFM",
  "Attribute 5 value(s)": 120,
  "Attribute 5 visible": 1,
  "Attribute 5 global": 0,
  "Attribute 6 name": "Volts",
  "Attribute 6 value(s)": "230/460",
  "Attribute 6 visible": 1,
  "Attribute 6 global": 0,
  "Attribute 7 name": "Weight",
  "Attribute 7 value(s)": 9999,
  "Attribute 7 visible": 1,
  "Attribute 7 global": 0,
  "Attribute 8 name": "PSI",
  "Attribute 8 value(s)": 125,
  "Attribute 8 visible": 1,
  "Attribute 8 global": 0,
  "Attribute 9 name": "Serial Number",
  "Attribute 9 value(s)": "4080C40",
  "Attribute 9 visible": 1,
  "Attribute 9 global": 0,
  "Attribute 10 name": "weight",
  "Attribute 10 value(s)": 9999,
  "Attribute 10 visible": 1,
  "Attribute 10 global": 1,
  "Attribute 11 name": "New / Used",
  "Attribute 11 value(s)": "Used",
  "Attribute 11 visible": 1,
  "Attribute 11 global": 1,
  "Attribute 12 name": "",
  "Attribute 12 value(s)": "",
  "Attribute 12 visible": "",
  "Attribute 12 global": "",
  "Attribute 13 name": "",
  "Attribute 13 value(s)": "",
  "Attribute 13 visible": "",
  "Attribute 13 global": "",
  "Attribute 14 name": "",
  "Attribute 14 value(s)": "",
  "Attribute 14 visible": "",
  "Attribute 14 global": "",
  "Attribute 15 name": "",
  "Attribute 15 value(s)": "",
  "Attribute 15 visible": "",
  "Attribute 15 global": "",
  "Attribute 16 name": "",
  "Attribute 16 value(s)": "",
  "Attribute 16 visible": "",
  "Attribute 16 global": "",
  "Attribute 17 name": "",
  "Attribute 17 value(s)": "",
  "Attribute 17 visible": "",
  "Attribute 17 global": "",
  "Attribute 18 name": "",
  "Attribute 18 value(s)": "",
  "Attribute 18 visible": "",
  "Attribute 18 global": "",
  "Attribute 19 name": "",
  "Attribute 19 value(s)": "",
  "Attribute 19 visible": "",
  "Attribute 19 global": "",
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  // const client = await getPayloadClient()

  // // iterate over all products in client and create a map of ids and stock
  // const productStocks: { id: string; stock: number | null | undefined }[] = []

  // const commonFindOptions: Omit<Options<"products">, "collection"> = {
  //   where: {
  //     and: [{ stock: { less_than: 1 } }, { lanco: { equals: true } }],
  //   },
  //   sort: "-updatedAt",
  //   limit: 999,
  // }

  // let allProducts: PaginatedDocs<Product> = await client.find<"products">({
  //   collection: "products",
  //   ...commonFindOptions,
  // })

  // while (allProducts.hasNextPage) {
  //   productStocks.push(
  //     ...allProducts.docs.map((product) => ({
  //       id: product.id,
  //       stock: product.stock,
  //     }))
  //   )

  //   allProducts = await client.find<"products">({
  //     collection: "products",
  //     ...commonFindOptions,
  //     page: allProducts.nextPage || 1,
  //   })
  // }

  // console.log("Total products", productStocks.length)

  // let deletedProducts: any[] = []

  // // iterate over all products and delete if stock is less than 0
  // for (const product of productStocks) {
  //   if ((product.stock || 0) < 1) {
  //     try {
  //       await client.delete<"products">({
  //         collection: "products",
  //         id: product.id,
  //       })
  //       deletedProducts.push(product)
  //       console.log("Deleted product", product.id)
  //     } catch (error) {
  //       console.error("Error deleting product", error)
  //     }
  //   }
  // }

  // console.log("Deleted products", deletedProducts.length)

  // // const allPriorIds = (wp as (typeof example)[])
  // //   // .filter((wp) => wp.Published === 1 && (wp.Stock || 0) > 0)
  // //   .map((wp) => wp.ID)

  // // console.log("Total exported WC products", allPriorIds.length)

  // // const commonFindOptions: Omit<Options<"products">, "collection"> = {
  // //   where: {
  // //     and: [
  // //       { updatedAt: { less_than: 1713382568977 } },
  // //       { "wc.wc_id": { not_in: allPriorIds } },
  // //       { stock: { greater_than: 0 } },
  // //       { lanco: { equals: true } },
  // //     ],
  // //   } as Where,
  // //   sort: "-updatedAt",
  // //   limit: 99,
  // // }

  // // const exportedProductsInStock = (wp as (typeof example)[]).filter(
  // //   (wp) => wp.Published === 1 && (wp.Stock || 0) > 0
  // // )

  // // console.log(
  // //   "Total exported WC products in stock",
  // //   exportedProductsInStock.length,
  // //   new Date("Fri Aug 16 2024 06:25:57 GMT-0700").toUTCString()
  // // )

  // // // find payload products that are in wc exportedProductsInStock
  // // const payloadProducts = await client.find<"products">({
  // //   collection: "products",
  // //   where: {
  // //     and: [
  // //       { "wc.wc_id": { in: exportedProductsInStock.map((wp) => wp.ID) } },
  // //       { lanco: { equals: true } },
  // //     ],
  // //   },
  // //   sort: "-updatedAt",
  // //   limit: 300,
  // // })

  // // console.log("Payload products in stock", payloadProducts.totalDocs)

  // // // get array of in stock products from export not in payload
  // // const exportedProductsToCreate = exportedProductsInStock.filter(
  // //   (wp) =>
  // //     !payloadProducts.docs.find(
  // //       (payloadProduct) => payloadProduct.wc.wc_id === wp.ID
  // //     )
  // // )

  // // console.log("Exported products to create", exportedProductsToCreate.length)

  // // const formatProduct = async (
  // //   wpProduct: typeof example
  // // ): Promise<Omit<Product, "id" | "updatedAt" | "createdAt">> => {
  // //   // format prices
  // //   const prices: Product["prices"] = {
  // //     regularPrice: wpProduct["Regular price"] * 100,
  // //     salePrice:
  // //       typeof wpProduct["Sale price"] === "number"
  // //         ? wpProduct["Sale price"] * 100
  // //         : undefined,
  // //   }

  // //   // format images
  // //   const images: WCImages = wpProduct.Images.split(", ").map((src) => ({
  // //     src,
  // //     alt: src.split("/").pop()?.split(".")[0] || "",
  // //   }))

  // //   // format attributes
  // //   const attributes: ProductAttributes = Object.keys(wpProduct)
  // //     .filter((key) => key.startsWith("Attribute"))
  // //     .map((key) => {
  // //       const attributeNumber = key.split(" ")[1]
  // //       return {
  // //         label: wpProduct[`Attribute ${attributeNumber} name`],
  // //         value: wpProduct[`Attribute ${attributeNumber} value(s)`],
  // //         visible: wpProduct[`Attribute ${attributeNumber} visible`] === 1,
  // //       }
  // //     })
  // //     .filter((attr) => attr.visible === true)

  // //   // dedupe attributes
  // //   const uniqueAttributes = Array.from(
  // //     new Set(attributes.map((attr) => attr.label))
  // //   )
  // //     .map((label) => {
  // //       const matchingAttribute = attributes.find(
  // //         (attr) => attr.label === label
  // //       )
  // //       return matchingAttribute
  // //     })
  // //     .filter((attr): attr is ProductAttributes[0] => !!attr)

  // //   const categories = await findMatchingWCIds({
  // //     collection: "categories",
  // //     where: {
  // //       title: {
  // //         like: wpProduct.Categories.replace(/[^a-zA-Z\d\s:]/g, ""),
  // //       },
  // //     } as Where,
  // //   })

  // //   if (!categories) {
  // //     console.log(
  // //       "No matching categories found for",
  // //       wpProduct.Categories.split(", ").map((cat) =>
  // //         cat.replace(/[^a-zA-Z\d\s:]/g, "")
  // //       )
  // //     )
  // //   }

  // //   return {
  // //     title: wpProduct.Name,
  // //     slug: wpProduct.Name.replace(/ /g, "-")
  // //       .replace(/[^\w-]+/g, "")
  // //       .toLowerCase(),
  // //     type: "simple",
  // //     _status: wpProduct.Published === 1 ? "published" : "draft",
  // //     featured: wpProduct["Is featured?"] === 1,
  // //     shortDescription: wpProduct["Short description"],
  // //     sku: wpProduct.SKU + "-lanco",
  // //     prices,
  // //     stock: wpProduct.Stock,
  // //     manageStock: true,
  // //     weight: wpProduct["Weight (lbs)"].toString(),
  // //     dimensions: {
  // //       length: wpProduct["Length (in)"],
  // //       width: wpProduct["Width (in)"],
  // //       height: wpProduct["Height (in)"],
  // //     },
  // //     categories,
  // //     wc: {
  // //       wc_id: wpProduct.ID,
  // //       description: wpProduct.Description,
  // //       images,
  // //     },
  // //     lanco: true,
  // //     attributes: uniqueAttributes,
  // //   }
  // // }

  // // // create products in payload
  // // for (const wpProduct of exportedProductsToCreate) {
  // //   const payloadProduct = await formatProduct(wpProduct)

  // //   try {
  // //     await client.create<"products">({
  // //       collection: "products",
  // //       data: payloadProduct,
  // //     })

  // //     console.log("Created product", payloadProduct.title)
  // //   } catch (error) {
  // //     console.error("Error creating product", error)
  // //   }
  // // }

  return NextResponse.json({})
}

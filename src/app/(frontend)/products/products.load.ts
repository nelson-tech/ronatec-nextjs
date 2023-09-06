import getPayloadClient from "~payload/payloadClient"
import { PaginatedDocs } from "payload/dist/mongoose/types"
import { Category, Product } from "~payload-types"
import productWhere from "@server/utils/productWhere"

export type LoaderData = {
  categories: Category[] | null
  productsData: PaginatedDocs<Product> | null
}

const getShopData = async () => {
  const client = await getPayloadClient()

  const data: LoaderData = { categories: null, productsData: null }

  // Get categories
  try {
    const categories = (await client.find({
      collection: "categories",
      limit: 100,
      where: {
        or: [{ parent: { exists: false } }, { parent: { equals: null } }],
      },
      sort: "title",
    })) as PaginatedDocs<Category>

    if (categories.totalDocs > 0) {
      data.categories = categories.docs
    }
  } catch (error) {
    console.warn("Error fetching category", error)
  }

  // Get products
  try {
    const publishedProducts = (await client.find({
      collection: "products",
      where: productWhere({
        categoriesIds: data.categories?.map((category) => category?.id),
      }),
    })) as PaginatedDocs<Product>

    data.productsData = publishedProducts
  } catch (error) {
    console.warn("Error fetching products", error)
  }

  return data
}

export default getShopData

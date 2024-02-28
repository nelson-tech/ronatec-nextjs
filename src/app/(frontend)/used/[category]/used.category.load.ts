import getPayloadClient from "~payload/payloadClient"
import { PaginatedDocs } from "payload/dist/mongoose/types"
import { Category, Product } from "~payload-types"
import productWhere from "@server/utils/productWhere"
import usedProductWhere from "@server/utils/usedProductWhere"

export type LoaderData = {
  productsData: PaginatedDocs<Product> | null
  category: Category | null
  childIds: (string | null)[]
  childCategories: Category[] | null
}

const getCategoryBySlug = async (slug: string) => {
  const client = await getPayloadClient()

  // find children
  const findChildren = async (
    categoryId: string
  ): Promise<(string | null)[]> => {
    const childMatches = (await client.find({
      collection: "categories",
      where: { parent: { equals: categoryId } },
    })) as PaginatedDocs<Category>

    let childIds: (string | null)[] = []

    childMatches.docs.forEach((child) => {
      findChildren(child.id).then(
        (children) => (childIds = childIds.concat(children))
      )

      childIds.push(child.id)
    })
    return childIds
  }

  const data: LoaderData = {
    category: null,
    productsData: null,
    childCategories: null,
    childIds: [],
  }

  if (slug) {
    try {
      const categories = await client.find({
        collection: "categories",
        where: {
          and: [
            {
              and: [
                { productCount: { greater_than: 0 } },
                { usedProductCount: { greater_than: 0 } },
              ],
            },
            { slug: { equals: slug } },
            { _status: { equals: "published" } },
          ],
        },
      })

      const category = categories?.docs?.length > 0 && categories.docs[0]

      if (category) {
        data.category = category
        const childMatches = (await client.find({
          collection: "categories",
          where: {
            and: [
              { parent: { equals: category.id } },
              { _status: { equals: "published" } },
            ],
          },
        })) as PaginatedDocs<Category>
        data.childCategories = childMatches.docs

        data.childIds = await findChildren(category.id)
      }
    } catch (error) {
      console.warn("Error fetching category", error)
    }
  }

  if (data.category) {
    try {
      const where = usedProductWhere({
        categoriesIds: [data.category.id, ...data.childIds],
      })

      const productsByCategory = (await client.find({
        collection: "products",
        where,
        page: 1,
      })) as PaginatedDocs<Product>

      data.productsData = productsByCategory
    } catch (error) {
      console.warn("Error fetching products", data.category, error)
    }
  }

  return data
}

export default getCategoryBySlug

import getPayloadClient from "~payload/payloadClient"
import { PaginatedDocs } from "payload/dist/mongoose/types"
import { Category, Product } from "payload/generated-types"

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
      const categories = (await client.find({
        collection: "categories",
        where: { slug: { equals: slug } },
      })) as PaginatedDocs<Category>

      const category = categories?.docs?.length > 0 && categories.docs[0]

      if (category) {
        data.category = category
        const childMatches = (await client.find({
          collection: "categories",
          where: { parent: { equals: category.id } },
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
      const productsByCategory = (await client.find({
        collection: "products",
        where: { categories: { in: [data.category.id, ...data.childIds] } },
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

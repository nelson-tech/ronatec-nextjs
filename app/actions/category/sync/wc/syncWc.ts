import { Endpoint } from "payload/dist/config/types"
import { checkRole } from "~payload/access/checkRole"
import { Category } from "payload/generated-types"
import he from "he"
import getPayloadAndUser from "@server/getPayloadAndUser"
import { WCCategory } from "~payload/collections/Categories/wcCategory"
import { NextResponse } from "next/server"

const url = process.env.WC_SOURCE + "/categories"

export const syncWc = async (req: Request, res: Response) => {
  const { payload, user } = await getPayloadAndUser()

  const isAdmin = checkRole(["admin"], user)

  if (isAdmin) {
    const response = await fetch(url)
    const rawData: WCCategory[] = await response.json()

    const categories: Category[] = []

    const findMatchingCategory = async (
      field: string,
      value: any
    ): Promise<Category | null> => {
      const matches = await payload.find({
        collection: "categories",
        where: { [field]: { equals: value } },
      })

      return matches.docs.length > 0 ? matches.docs[0] : null
    }

    const syncCategories = async (targetCats: WCCategory[]) => {
      await targetCats.forEach(async (rawCategory) => {
        const formattedCat: Category["wc"] = {
          ...rawCategory,
          wc_id: rawCategory.id,
          name: he.decode(rawCategory.name),
          description: he.decode(rawCategory.description),
          image: rawCategory.image?.id
            ? {
                ...rawCategory.image,
                alt: rawCategory.image.alt || rawCategory.image.name,
                wc_id: rawCategory.image.id,
              }
            : undefined,
        }

        // check if WC data has been imported before
        const matchedByID = await findMatchingCategory(
          "wc.wc_id",
          rawCategory?.id
        )

        if (!matchedByID) {
          // ("category has not been imported")

          // check for matching slug

          const matchedBySlug = await findMatchingCategory(
            "slug",
            rawCategory.slug
          )

          if (matchedBySlug) {
            // existing category, update with WC info

            if (matchedBySlug?.id) {
              const updatedCategory = await payload.update({
                collection: "categories",
                id: matchedBySlug.id,
                data: { wc: formattedCat, _status: "draft" },
              })

              categories.push(updatedCategory)
            }
          } else {
            // no matching slug, create category

            const category: Omit<
              Category,
              "id" | "updatedAt" | "createdAt" | "sizes"
            > = {
              title: formattedCat.name,
              slug: formattedCat.slug,
              wc: formattedCat,
              _status: "draft",
            }

            try {
              const newCategory = await payload.create({
                collection: "categories",
                data: category,
              })

              categories.push(newCategory)
            } catch (error) {
              console.warn("Error creating new category", error)
            }
          }
        }

        const children = rawData.filter(
          (cat) => !!cat.id && cat.parent === rawCategory.id
        )

        children.length > 0 && (await syncCategories(children))
      })
    }

    // Process top-level first, recursively processing children
    const topCats = rawData.filter((cat) => !!cat.id && cat.parent === 0)

    return await syncCategories(topCats).then((r) => NextResponse.json({}))
  } else {
    NextResponse.json({ error: "Authorization denied" })
  }
}

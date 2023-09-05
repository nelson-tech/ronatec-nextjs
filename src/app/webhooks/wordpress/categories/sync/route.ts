import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"
import { checkRole } from "~payload/access/checkRole"
import { WCWH_Category } from "../../utils/types"
import formatCategory from "../../utils/formatCategory"
import findMatchingDocument from "../../utils/findMatchingDocument"

const url = process.env.WC_SOURCE + "/categories?per_page=100"

export const GET = async (req: Request, res: Response) => {
  const { payload, user } = await getPayloadAndUser()

  const isAdmin = checkRole(["admin"], user)

  if (isAdmin) {
    const response = await fetch(url)
    const categories = (await response.json()) as WCWH_Category[]

    if (categories?.at(0)?.id) {
      // Categories retrieved

      const syncCategories = async (targetCats: WCWH_Category[]) => {
        targetCats.forEach(async (rawCategory) => {
          // check if WC data has been imported before
          const matchedByID = await findMatchingDocument({
            collection: "categories",
            where: { "wc.wc_id": { equals: rawCategory?.id } },
            payload,
          })

          if (!matchedByID) {
            // ("category has not been imported")

            // check for matching slug
            const matchedBySlug = await findMatchingDocument({
              collection: "categories",
              where: { slug: { equals: rawCategory?.slug } },
              payload,
            })

            if (matchedBySlug?.id) {
              // existing category, update with WC info

              const formattedCat = await formatCategory({
                incoming: rawCategory,
                existingCategory: matchedBySlug,
                payload,
              })

              const updatedCategory = await payload.update({
                collection: "categories",
                id: matchedBySlug.id,
                data: formattedCat,
              })

              console.log("Updated", updatedCategory.title)
            } else {
              // no matching slug, create category

              const formattedCat = await formatCategory({
                incoming: rawCategory,
                payload,
              })

              try {
                const newCategory = await payload.create({
                  collection: "categories",
                  data: formattedCat,
                })
                console.log("Created", newCategory.title)
              } catch (error) {
                console.warn("Error creating new category", error)
              }
            }
          } else {
            // category has been imported previously, update it
            const formattedCat = await formatCategory({
              incoming: rawCategory,
              existingCategory: matchedByID,
              payload,
            })

            const updatedCategory = await payload.update({
              collection: "categories",
              id: matchedByID.id,
              data: formattedCat,
            })
          }

          const children = categories.filter(
            (cat) => !!cat.id && cat.parent === rawCategory.id
          )

          children.length > 0 && (await syncCategories(children))
        })
      }

      // Process top-level first, recursively processing children
      const topCats = categories.filter((cat) => !!cat.id && cat.parent === 0)

      await syncCategories(topCats)
    }

    return NextResponse.json({ auth: "success", categories })
  }
  return NextResponse.json({ auth: "failed" })
}

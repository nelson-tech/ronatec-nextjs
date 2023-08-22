import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"
import { checkRole } from "~payload/access/checkRole"

const url = process.env.WC_SOURCE

export const tagLanco = async (req: Request, res: Response) => {
  const { payload, user } = await getPayloadAndUser()

  const isAdmin = checkRole(["admin"], user)

  if (isAdmin) {
    try {
      const lancoTags = await payload.find({
        collection: "tags",
        where: { slug: { equals: "lanco" } },
      })
      const lancoTag = lancoTags.docs.at(0)?.id

      if (lancoTag) {
        const lancoCatIds = (
          await payload.find({
            collection: "categories",
            where: { tags: { contains: lancoTag } },
            limit: 999,
          })
        ).docs.map((doc) => doc.id)

        await lancoCatIds.forEach(async (catId) => {
          try {
            const lancoProducts = await payload.find({
              collection: "products",
              where: {
                and: [
                  { categories: { contains: catId } },
                  { tags: { not_in: lancoTag } },
                ],
              },
              limit: 999,
            })

            console.log("Products found", lancoProducts.totalDocs)
          } catch (error) {
            console.warn("Error finding products", error)
          }
        })
      }
    } catch (error) {
      console.warn("Error getting lanco products", error)
    }
  }

  return NextResponse.json({})
}

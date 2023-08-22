import { checkRole } from "~payload/access/checkRole"
import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"

export const syncTags = async (req: Request, res: Response) => {
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
        const lancoCats = await payload.find({
          collection: "categories",
          where: { slug: { equals: "lanco" } },
        })

        const lancoChildren = await payload.find({
          collection: "categories",
          where: { parent: { equals: lancoCats.docs.at(0)?.id } },
          limit: 100,
        })

        console.log("Children found", lancoChildren.totalDocs)

        lancoChildren.docs.forEach((lancoChild) => {
          try {
            const existingTags = lancoChild.tags?.map((tag) =>
              typeof tag === "object" ? tag.id : tag
            )

            const mergedTags = [...new Set([...(existingTags ?? []), lancoTag])]

            console.log("Merged Tags", mergedTags)

            payload
              .update({
                collection: "categories",
                id: lancoChild.id,
                data: {
                  tags: mergedTags,
                },
              })
              .then((updatedCat) => console.log("Updated Cat", updatedCat.slug))
          } catch (error) {
            console.warn("Error adding tag to category", lancoChild.slug, error)
          }
        })
      }
    } catch (error) {
      console.warn("Error getting lanco children", error)
    }
  }

  return NextResponse.json({})
}

// const endpoints: Omit<Endpoint, "root">[] = [
//   {
//     path: "/sync/fix_orphans",
//     method: "get",
//     handler: async (req, res, next) => {
//       const { payload, query, user } = req
//       const isAdmin = checkRole(["admin"], user)

//       if (isAdmin) {
//         const id = query.id

//         const orphans = await payload.update({
//           collection: "categories",
//           where: { parent: { equals: "64b5aaf69133a3508c6773fb" } },
//           data: { parent: "" },
//         })

//         console.log("Orphans", orphans)

//         // await children.docs.forEach(async (child) => {
//         //   const parents = await payload.find({
//         //     collection: "categories",
//         //     where: { "wc.wc_id": { equals: child.wc?.parent } },
//         //   })

//         //   if (parents.docs.length > 0) {
//         //     const parent = parents.docs[0]

//         //     await payload.update({
//         //       collection: "categories",
//         //       id: child.id,
//         //       data: {
//         //         parent: typeof parent === "object" ? parent.id : parent,
//         //       },
//         //     })
//         //   }
//         // })
//       }
//     },
//   },
// ]

// export default endpoints

import { Endpoint } from "payload/dist/config/types"
import { checkRole } from "../../access/checkRole"
import { WCCategory } from "./wcCategory"
import { Category } from "payload/generated-types"
import he from "he"

const url = "https://dev.api.ronatec.us/wp-json/wc/store/v1/products/categories"

const endpoints: Omit<Endpoint, "root">[] = [
  {
    path: "/sync/wc",
    method: "get",
    handler: async (req, res, next) => {
      const { payload, query, user } = req
      const isAdmin = checkRole(["admin"], user)

      if (isAdmin) {
        const id = query.id

        let rawData: WCCategory[]

        const lancoMatches = await payload.find({
          collection: "categories",
          where: { slug: { equals: "lanco" } },
        })

        console.log("Lanco matches", lancoMatches.docs)

        let lanco = lancoMatches.docs.length > 0 ? lancoMatches.docs[0] : null

        if (!lanco) {
          lanco = await payload.create({
            collection: "categories",
            data: { title: "Lanco", slug: "lanco" },
          })
        }

        if (id) {
          const response = await fetch(url + `/${id}`)
          rawData = await response.json()
        } else {
          const response = await fetch(url)
          rawData = await response.json()
        }

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
                  ...(formattedCat.parent === 0 &&
                  (formattedCat.wc_id ?? 0) >= 117
                    ? { parent: lanco?.id }
                    : {}),
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

        await syncCategories(topCats).then((r) =>
          res.status(200).send({ categories })
        )
      } else {
        res.status(200).send({ error: "Authorization denied" })
      }
    },
  },
  {
    path: "/sync/wc_parents",
    method: "get",
    handler: async (req, res, next) => {
      const { payload, query, user } = req
      const isAdmin = checkRole(["admin"], user)

      if (isAdmin) {
        const id = query.id

        const children = await payload.find({
          collection: "categories",
          where: { "wc.parent": { not_equals: 0 } },
        })

        await children.docs.forEach(async (child) => {
          const parents = await payload.find({
            collection: "categories",
            where: { "wc.wc_id": { equals: child.wc?.parent } },
          })

          if (parents.docs.length > 0) {
            const parent = parents.docs[0]

            await payload.update({
              collection: "categories",
              id: child.id,
              data: {
                parent: typeof parent === "object" ? parent.id : parent,
              },
            })
          }
        })
      }
    },
  },
  {
    path: "/sync/tag_lanco",
    method: "get",
    handler: async (req, res, next) => {
      const { payload, query, user } = req
      const isAdmin = checkRole(["admin"], user)

      if (isAdmin) {
        const id = query.id

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

                const mergedTags = [
                  ...new Set([...(existingTags ?? []), lancoTag]),
                ]

                console.log("Merged Tags", mergedTags)

                payload
                  .update({
                    collection: "categories",
                    id: lancoChild.id,
                    data: {
                      tags: mergedTags,
                    },
                  })
                  .then((updatedCat) =>
                    console.log("Updated Cat", updatedCat.slug)
                  )
              } catch (error) {
                console.warn(
                  "Error adding tag to category",
                  lancoChild.slug,
                  error
                )
              }
            })
          }
        } catch (error) {
          console.warn("Error getting lanco children", error)
        }
      }
    },
  },
  {
    path: "/sync/fix_orphans",
    method: "get",
    handler: async (req, res, next) => {
      const { payload, query, user } = req
      const isAdmin = checkRole(["admin"], user)

      if (isAdmin) {
        const id = query.id

        const orphans = await payload.update({
          collection: "categories",
          where: { parent: { equals: "64b5aaf69133a3508c6773fb" } },
          data: { parent: "" },
        })

        console.log("Orphans", orphans)

        // await children.docs.forEach(async (child) => {
        //   const parents = await payload.find({
        //     collection: "categories",
        //     where: { "wc.wc_id": { equals: child.wc?.parent } },
        //   })

        //   if (parents.docs.length > 0) {
        //     const parent = parents.docs[0]

        //     await payload.update({
        //       collection: "categories",
        //       id: child.id,
        //       data: {
        //         parent: typeof parent === "object" ? parent.id : parent,
        //       },
        //     })
        //   }
        // })
      }
    },
  },
]

export default endpoints

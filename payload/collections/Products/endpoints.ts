import { Endpoint } from "payload/dist/config/types"
import { checkRole } from "../../access/checkRole"
import { WCProduct } from "./wcProductType"
import { Product } from "payload/generated-types"
import he from "he"

const url = process.env.WC_SOURCE

const endpoints: Omit<Endpoint, "root">[] = [
  {
    path: "/sync/wc",
    method: "get",
    handler: async (req, res, next) => {
      const { payload, query, user } = req

      console.log("Checking permissions")

      const isAdmin = checkRole(["admin"], user)

      if (isAdmin) {
        console.log("Ready to go.")

        let end = false
        let page = 1

        while (!end) {
          const id = query.id

          let rawData: WCProduct[]

          if (id) {
            const response = await fetch(url + `/${id}`)
            rawData = await response.json()
            end = true
          } else {
            const response = await fetch(url + `?page=${page}&per_page=100`)
            page++
            rawData = await response.json()
            rawData.length < 100 && (end = true)
          }
          const products: Product[] = []

          const findMatchingProduct = async (
            field: string,
            value: any
          ): Promise<Product | null> => {
            const matches = await payload.find({
              collection: "products",
              where: { [field]: { equals: value } },
            })

            return matches.docs.length > 0 ? matches.docs[0] : null
          }

          // const url = 'https://dev.api.ronatec.us/wp-json/wc/store/v1/products'
          // const productsResponse = await fetch(url)
          // const rawProducts: WCProduct[] = await productsResponse.json()

          // const products: Product[] = []

          // rawProducts.forEach(rawProduct => {
          //   const product: Partial<Product> = { sku: rawProduct.sku, title: rawProduct.name }
          // })
          // console.log('Products', rawProducts)

          const getParentID = async (wcParentID: number) => {
            if (wcParentID === 0) return null

            const products = await payload.find({
              collection: "products",
              where: { "wc.wc_id": { equals: wcParentID } },
            })

            if (products.docs.length > 0 && products.docs[0].id) {
              console.log("Parent ID:", products.docs[0].id)

              return products.docs[0].id
            }

            return null
          }

          const syncProducts = async (targetProducts: WCProduct[]) => {
            await targetProducts.forEach(async (rawProduct) => {
              const formattedProduct: Product["wc"] = {
                ...rawProduct,
                wc_id: rawProduct.id,
                name: he.decode(rawProduct.name),
                description: he.decode(rawProduct.description),
                categories:
                  (rawProduct?.categories?.length ?? 0) > 0
                    ? rawProduct.categories.map((catWithId) => {
                        const { id, ...category } = catWithId
                        return {
                          ...category,
                          wc_id: id,
                          name: he.decode(category.name),
                        }
                      })
                    : [],
                attributes:
                  (rawProduct?.attributes?.length ?? 0) > 0
                    ? rawProduct.attributes.map((attWithId) => {
                        const { id, ...attribute } = attWithId
                        const terms = attribute.terms.map((termWithId) => {
                          const { id, ...term } = termWithId
                          return {
                            ...term,
                            wc_id: id,
                            name: he.decode(term.name),
                          }
                        })
                        return {
                          ...attribute,
                          terms,
                          wc_id: id,
                          name: he.decode(attribute.name),
                        }
                      })
                    : [],
                images:
                  (rawProduct?.images?.length ?? 0) > 0
                    ? rawProduct.images.map((imageWithId) => {
                        const { id, ...image } = imageWithId
                        return {
                          ...image,
                          wc_id: id,
                          alt: he.decode(image.alt),
                          name: he.decode(image.name),
                        }
                      })
                    : [],
                add_to_cart: {
                  ...rawProduct.add_to_cart,
                  description: he.decode(rawProduct.add_to_cart.description),
                },
              }

              // check if WC data has been imported before
              const matchedByID = await findMatchingProduct(
                "wc.wc_id",
                rawProduct?.id
              )

              if (!matchedByID) {
                // ("product has not been imported")

                // check for matching slug

                const matchedBySlug = await findMatchingProduct(
                  "slug",
                  rawProduct.slug
                )

                if (matchedBySlug) {
                  // existing product, update with WC info

                  if (matchedBySlug?.id) {
                    const updatedProduct = await payload.update({
                      collection: "products",
                      id: matchedBySlug.id,
                      data: { wc: formattedProduct, _status: "draft" },
                    })

                    products.push(updatedProduct)
                  }
                } else {
                  // no matching slug, create product

                  const wcCats = formattedProduct.categories?.map(
                    (cat) => cat.wc_id
                  )

                  const categoryMatches = await payload.find({
                    collection: "categories",
                    where: { "wc.wc_id": { in: wcCats } },
                  })

                  const categories =
                    categoryMatches.docs?.length > 0
                      ? categoryMatches.docs.map((cat) => cat.id)
                      : []

                  const product: Omit<
                    Product,
                    "id" | "updatedAt" | "createdAt" | "sizes"
                  > = {
                    title: formattedProduct.name ?? "",
                    slug: formattedProduct.slug,
                    // parent: await getParentID(formattedProduct.parent),
                    wc: formattedProduct,
                    categories,
                    _status: "draft",
                  }

                  try {
                    const newProduct = await payload.create({
                      collection: "products",
                      data: product,
                    })

                    products.push(newProduct)
                  } catch (error) {
                    console.warn("Error creating new product", error)
                  }
                }
              }

              const children = rawData.filter(
                (product) => !!product.id && product.parent === rawProduct.id
              )

              children.length > 0 && (await syncProducts(children))
            })
          }

          // Process top-level first, recursively processing children
          const topProducts = rawData.filter(
            (cat) => !!cat.id && cat.parent === 0
          )

          console.log(`Syncing ${topProducts.length} products`)

          await syncProducts(topProducts)
        }

        res.status(200).send({})
      } else {
        res.status(200).send({ error: "Authorization denied" })
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

                // lancoProducts.docs.forEach((product) => {
                //   try {
                //     const existingTags = product.tags?.map((tag) =>
                //       typeof tag === "object" ? tag.id : tag
                //     )

                //     const mergedTags = [
                //       ...new Set([...(existingTags ?? []), lancoTag]),
                //     ]

                //     console.log("Merged Tags", mergedTags)

                //     payload
                //       .update({
                //         collection: "products",
                //         id: product.id,
                //         data: {
                //           tags: mergedTags,
                //         },
                //       })
                //       .then((updatedCat) =>
                //         console.log("Updated Product", updatedCat.slug)
                //       )
                //   } catch (error) {
                //     console.warn(
                //       "Error adding tag to category",
                //       product.slug,
                //       error
                //     )
                //   }
                // })
              } catch (error) {
                console.warn("Error finding products", error)
              }
            })
          }
        } catch (error) {
          console.warn("Error getting lanco products", error)
        }

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

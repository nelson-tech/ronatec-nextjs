import { Endpoint } from "payload/dist/config/types"
import { checkRole } from "~payload/access/checkRole"
import { Product } from "payload/generated-types"
import he from "he"
import getPayloadAndUser from "@server/getPayloadAndUser"
import { WCProduct } from "~payload/collections/Products/wcProductType"
import { NextResponse } from "next/server"

const url = process.env.WC_SOURCE

export const syncWc = async (req: Request, res: Response) => {
  const { payload, user } = await getPayloadAndUser()

  const isAdmin = checkRole(["admin"], user)

  if (isAdmin) {
    console.log("Ready to go.")

    let end = false
    let page = 1

    while (!end) {
      const response = await fetch(url + `?page=${page}&per_page=100`)
      page++
      const rawData = await response.json()
      rawData.length < 100 && (end = true)

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

          const wcCats = formattedProduct.categories?.map((cat) => cat.wc_id)

          const categoryMatches = await payload.find({
            collection: "categories",
            where: { "wc.wc_id": { in: wcCats } },
          })

          const categories =
            categoryMatches.docs?.length > 0
              ? categoryMatches.docs.map((cat) => cat.id)
              : []

          if (!matchedByID) {
            // ("product has not been imported")

            // check for matching slug

            const matchedBySlug = await findMatchingProduct(
              "slug",
              rawProduct.slug
            )

            if (matchedBySlug) {
              // existing product, update with WC info

              console.log("Matched by slug")

              if (matchedBySlug?.id) {
                console.log("Updating product")

                const updatedProduct = await payload.update({
                  collection: "products",
                  id: matchedBySlug.id,
                  data: { wc: formattedProduct, _status: "draft", categories },
                })
              }
            } else {
              // no matching slug, create product

              console.log("No match, creating product")

              const product: Omit<Product, "id" | "updatedAt" | "createdAt"> = {
                title: formattedProduct.name ?? "",
                slug: formattedProduct.slug,
                // parent: await getParentID(formattedProduct.parent),
                wc: formattedProduct,
                prices: {
                  regularPrice: Number.parseInt(
                    formattedProduct.prices?.regular_price ?? "0"
                  ),
                  salePrice: Number.parseInt(
                    formattedProduct.prices?.sale_price ?? "0"
                  ),
                },
                categories,
                _status: "draft",
              }

              try {
                const newProduct = await payload.create({
                  collection: "products",
                  data: product,
                })
              } catch (error) {
                console.warn("Error creating new product", error)
              }
            }
          } else {
            // existing product, update with WC info

            if (matchedByID.id) {
              const updatedProduct = await payload.update({
                collection: "products",
                id: matchedByID.id,
                data: { wc: formattedProduct, _status: "draft", categories },
              })
            }
          }

          const children = rawData.filter(
            (product) => !!product.id && product.parent === rawProduct.id
          )

          children.length > 0 && (await syncProducts(children))
        })
      }

      // Process top-level first, recursively processing children
      const topProducts = rawData.filter((cat) => !!cat.id && cat.parent === 0)

      console.log(`Syncing ${topProducts.length} products`)

      await syncProducts(topProducts)
    }

    return NextResponse.json({})
  } else {
    NextResponse.json({ error: "Authorization denied" })
  }
}

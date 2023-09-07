import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"
import { checkRole } from "~payload/access/checkRole"
import { WCProduct } from "~payload/collections/Products/wcProductType"
import findMatchingDocument from "../../utils/findMatchingDocument"
import formatProduct from "../../utils/formatProduct"

const urlFallback = process.env.WC_SOURCE

export const GET = async (req: Request, res: Response) => {
  const lanco = new URL(req.url).searchParams.get("lanco") === "true"

  const domain = new URL(req.url).searchParams.get("domain")
  const url = domain
    ? `https://${domain}/wp-json/wc/store/v1/products`
    : urlFallback

  const { payload, user } = await getPayloadAndUser()

  const isAdmin = checkRole(["admin"], user)

  if (isAdmin) {
    let end = false
    let page = 1

    while (!end) {
      const response = await fetch(url + `?page=${page}&per_page=100`)
      page++
      const rawData = await response.json()
      rawData.length < 100 && (end = true)

      const syncProducts = async (targetProducts: WCProduct[]) => {
        await targetProducts.forEach(async (rawProduct) => {
          // check if WC data has been imported before
          const matchedByID = await findMatchingDocument({
            collection: "products",
            where: { "wc.wc_id": { equals: rawProduct?.id } },
            payload,
          })

          if (!matchedByID?.id) {
            // ("product has not been imported")

            // check for matching slug

            const matchedBySlug = await findMatchingDocument({
              collection: "products",
              where: { slug: { equals: rawProduct?.slug } },
              payload,
            })

            if (matchedBySlug?.id) {
              // existing product, update with WC info

              console.log("Matched by slug")

              console.log("Updating product")

              const formattedProduct = await formatProduct({
                incoming: rawProduct,
                existingProduct: matchedBySlug,
                webhook: false,
                lanco,
              })

              const updatedProduct = await payload.update({
                collection: "products",
                id: matchedBySlug.id,
                data: formattedProduct,
              })
            } else {
              // no matching slug, create product

              const formattedProduct = await formatProduct({
                incoming: rawProduct,
                webhook: false,
                lanco,
              })

              try {
                const newProduct = await payload.create({
                  collection: "products",
                  data: formattedProduct,
                })
              } catch (error) {
                console.warn(
                  "Error creating new product",
                  error,
                  formattedProduct.title
                )
              }
            }
          } else {
            // existing product, update with WC info

            const formattedProduct = await formatProduct({
              incoming: rawProduct,
              existingProduct: matchedByID,
              webhook: false,
              lanco,
            })

            const updatedProduct = await payload.update({
              collection: "products",
              id: matchedByID.id,
              data: formattedProduct,
            })
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
    return NextResponse.json({ error: "Authorization denied" })
  }
}

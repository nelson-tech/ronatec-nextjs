import getPayloadClient from "~payload/payloadClient"
import type { WCWH_Product } from "../../utils/types"
import formatProduct from "../../utils/formatProduct"
import findMatchingDocument from "../../utils/findMatchingDocument"
import type { SendMailOptions } from "nodemailer"
import type { Settings } from "~payload-types"

export const updateProduct = async (data: WCWH_Product, lanco?: boolean) => {
  const payload = await getPayloadClient()

  const debugEmail = (
    (await payload.findGlobal({ slug: "settings" })) as Settings
  ).debugEmail

  // check if WC data has been imported before
  const existingProduct = await findMatchingDocument({
    collection: "products",
    where: { "wc.wc_id": { equals: data?.id } },
    payload,
  })

  if (existingProduct) {
    // Found a match

    // Format incoming product
    const formattedProduct = await formatProduct({
      incoming: data,
      existingProduct,
      lanco,
      webhook: true,
    })

    if (debugEmail) {
      const adminEmail: SendMailOptions = {
        to: debugEmail,
        subject: `Lanco product updating: ${formattedProduct.title}`,
        text: JSON.stringify(formattedProduct || "{}"),
      }
      payload.sendEmail(adminEmail)
    }

    const updatedProduct = await payload.update({
      collection: "products",
      id: existingProduct.id,
      data: formattedProduct,
    })

    return "Product updated"
  } else {
    // No matching product. Create it!

    const formattedProduct = await formatProduct({
      incoming: data,
      lanco: true,
      webhook: true,
    })

    if (debugEmail) {
      const adminEmail: SendMailOptions = {
        to: debugEmail,
        subject: `Lanco product created: ${formattedProduct.title}`,
        text: JSON.stringify(formattedProduct || "{}"),
      }
      payload.sendEmail(adminEmail)
    }

    const newProduct = await payload.create({
      collection: "products",
      data: formattedProduct,
    })

    return "Product added"
  }
}

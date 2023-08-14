import { NextResponse } from "next/server"

import getPayloadAndUser from "@server/getPayloadAndUser"

export const addToCart = async (request: Request, { params }) => {
  const data = await request.json()
  // TODO - Verify data

  const { payload, user } = await getPayloadAndUser()

  const cart = await payload
    .update({
      collection: "carts",
      id: params.id,
      data,
      overrideAccess: true,
      user,
    })
    .catch((e) => console.warn("Error updating cart", e))

  console.log("Cart", cart)

  return NextResponse.json({ cart })
}

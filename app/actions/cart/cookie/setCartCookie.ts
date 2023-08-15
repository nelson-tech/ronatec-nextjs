import { CART_TOKEN_KEY } from "@utils/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import cookieOptions from "./cookieOptions"

export const setCartCookie = async (request: Request) => {
  const data: { id?: string } = await request.json()
  const cookieStore = cookies()

  if (data.id) {
    cookieStore.set(CART_TOKEN_KEY, data.id, cookieOptions)
  }
  return NextResponse.json({})
}

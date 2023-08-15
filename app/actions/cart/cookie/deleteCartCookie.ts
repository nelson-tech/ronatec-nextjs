import { CART_TOKEN_KEY } from "@utils/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import cookieOptions from "./cookieOptions"

export const deleteCartCookie = async (request: Request) => {
  const cookieStore = cookies()

  cookieStore.set(CART_TOKEN_KEY, "", { ...cookieOptions, maxAge: 0 })

  return NextResponse.json({})
}

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

const cookieOptions: Partial<ResponseCookie> = {
  domain: process.env.COOKIE_DOMAIN,
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: false,
  maxAge: 604_800 * 4, // 4 weeks
}

export default cookieOptions

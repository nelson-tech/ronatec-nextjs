import { serialize, CookieSerializeOptions } from "cookie"

/**
 * This sets `cookie` using the `res` object
 */
export const getFormattedCookie = (
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  return serialize(name, stringValue, options)
}

export default getFormattedCookie

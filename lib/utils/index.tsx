"use client"

export { default as parse, htmlParserOptions } from "./htmlParser"

export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "")
}

export function removeExtraSpaces(text: string) {
  return text.replace(/\s+/g, " ").trim()
}

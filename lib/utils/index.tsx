"use client"

export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "")
}

export function removeExtraSpaces(text: string) {
  return text.replace(/\s+/g, " ").trim()
}

/**
 * removeLastTrailingSlash
 */

export const isServer = (): boolean => typeof window === "undefined"

export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "")
}

export function removeExtraSpaces(text: string) {
  return text.replace(/\s+/g, " ").trim()
}

export function parseNewLines(text: string) {
  const splitText = text.split("\r\n")

  const Paragraph = (
    <div className="parsed-block h-full">
      {splitText.map((line, index) => {
        return (
          <p
            key={"newLineParse" + line.length + line.split("a")[0] + index}
            className={`parsed-p parsed-${index}`}
          >
            {line || "\b"}
          </p>
        )
      })}
    </div>
  )
  return Paragraph
}

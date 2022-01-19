/**
 * removeLastTrailingSlash
 */

import { Element, HTMLReactParserOptions } from "html-react-parser"
import { Image } from "@components"

export const isServer = ((): boolean => typeof window === "undefined")()

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

export const htmlParserOptions: HTMLReactParserOptions = isServer
  ? {}
  : {
      replace: domNode => {
        if (domNode instanceof Element) {
          if (domNode.name === "img") {
            return (
              <Image
                src={domNode.attribs.src}
                alt={domNode.attribs.alt || domNode.attribs.src}
                height={domNode.attribs.height}
                width={domNode.attribs.width}
                objectFit="cover"
                layout="responsive"
                rounded="lg"
              />
            )
          }
        }
      },
    }

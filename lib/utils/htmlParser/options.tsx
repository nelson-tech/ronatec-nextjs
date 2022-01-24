import parse, { Element, HTMLReactParserOptions } from "html-react-parser"

import { Image } from "@components"
import { ParsedTabs } from "."

export const htmlParserOptions: HTMLReactParserOptions =
  typeof window === "undefined"
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
            } else if (
              domNode.attributes.find(a => a.name === "class")?.value ===
              "tab-group"
            ) {
              return <ParsedTabs domNode={domNode} />
            }
          }
        },
      }

export default parse

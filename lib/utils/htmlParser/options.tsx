import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"

import Image from "@components/Image"
import { ParsedTabs } from "."
import MenuLink from "@components/Link"

export const htmlParserOptions: HTMLReactParserOptions =
  typeof window === "undefined"
    ? {}
    : {
        replace: (domNode) => {
          if (domNode instanceof Element) {
            if (domNode.name === "img") {
              return (
                <Image
                  src={domNode.attribs.src}
                  alt={domNode.attribs.alt || domNode.attribs.src}
                  height={parseInt(domNode.attribs.height)}
                  width={parseInt(domNode.attribs.width)}
                />
              )
            } else if (
              domNode.attributes.find((a) => a.name === "class")?.value ===
              "menu-link"
            ) {
              const url = domNode.attribs.href
              const title = domNode.attribs.title

              return (
                <div className="text-green-main hover:text-blue-main transition px-2 underline">
                  <MenuLink href={url} title={title}>
                    {domToReact(domNode.children, htmlParserOptions)}
                  </MenuLink>
                </div>
              )
            } else if (
              domNode.attributes.find((a) => a.name === "class")?.value ===
              "tab-group"
            ) {
              return <ParsedTabs domNode={domNode} />
            }
          }
        },
      }

export default parse

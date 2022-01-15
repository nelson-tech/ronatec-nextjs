import { DOMElement, useEffect, useState } from "react"
import { convertDocEleToReact } from "./convertDocElToReact"

export const SVGUrl = ({
  uri,
  iconKey,
  ...props
}: {
  uri: string
  iconKey?: string
}): { loading: boolean; svgEl: JSX.Element | null } => {
  const [Comp, setComp] = useState<DOMElement<any, Element> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(uri)
      .then(res => res.text())
      .then(res => {
        const domParser = new DOMParser()
        const ele = domParser.parseFromString(res, "image/svg+xml")

        setComp(
          convertDocEleToReact(ele.documentElement, {
            className: "w-full h-full",
            uri,
            iconKey,
          }),
        )

        setLoading(false)
      })
  }, [uri, iconKey])

  return { loading, svgEl: Comp }
}

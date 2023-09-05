import type { Metadata } from "next/types"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"
import { Meta } from "~payload-types"

const parseMetaData = (seo: Meta | undefined, title?: string) => {
  const metaData: Metadata = {
    title: title ?? seo?.title,
    description: seo?.description,
    // keywords: seo?.focusKeywords ? (seo.focusKeywords as string[]) : [],
    // openGraph: {
    //   ...(seo?.openGraph as OpenGraph),
    //   title: seo?.openGraph?.title ? seo.openGraph.title : undefined,
    //   type: "website",
    // },
    // TODO - Add opengraph to payload meta
  }

  return metaData
}

export default parseMetaData

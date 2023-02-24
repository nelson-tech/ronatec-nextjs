import type { Metadata } from "next/types"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import {
  RankMathPostTypeSeo,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"

const parseMetaData = (
  seo: RankMathPostTypeSeo | RankMathProductTypeSeo,
  title?: string
) => {
  const metaData: Metadata = {
    title: title ?? seo?.title,
    description: seo?.description,
    keywords: seo?.focusKeywords ? (seo.focusKeywords as string[]) : [],
    openGraph: {
      ...(seo?.openGraph as OpenGraph),
      title: seo?.openGraph?.title ? seo.openGraph.title : undefined,
      type: "website",
    },
  }

  return metaData
}

export default parseMetaData

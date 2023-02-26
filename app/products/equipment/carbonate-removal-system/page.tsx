import { Fragment } from "react"

import { SEO_TITLE } from "@lib/constants"

import PageHeader from "@components/PageHeader"
import CarbonateRemovalSystemComponent from "@components/Pages/Products/CarbonateRemovalSystem"

// ####
// #### Variables
// ####

const title = "Carbonate Removal System"

// ####
// #### Component
// ####

const CarbonateRemovalSystemPage = () => {
  return (
    <Fragment>
      <PageHeader title={title} />
      <CarbonateRemovalSystemComponent />
    </Fragment>
  )
}

export default CarbonateRemovalSystemPage

export const metadata = {
  title: `${title} ${SEO_TITLE}`,
  description:
    "The Ronatec DeCarb is the premier domestically designed and manufactured sodium carbonate removal system.",
  keywords: ["Carbonate", "Removal", "Ronatec", "Metal Finishing"],
}

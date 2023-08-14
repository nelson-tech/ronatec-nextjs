import { SEO_TITLE } from "@utils/constants"

import PageHeader from "@components/PageHeader"
import CarbonateRemovalSystemComponent from "./CarbonateRemovalSystem"

// ####
// #### Variables
// ####

const title = "Carbonate Removal System"

// ####
// #### Component
// ####

const CarbonateRemovalSystemPage = () => {
  return (
    <>
      <PageHeader title={title} />
      <CarbonateRemovalSystemComponent />
    </>
  )
}

export default CarbonateRemovalSystemPage

export const metadata = {
  title: `${title} ${SEO_TITLE}`,
  description:
    "The Ronatec DeCarb is the premier domestically designed and manufactured sodium carbonate removal system.",
  keywords: ["Carbonate", "Removal", "Ronatec", "Metal Finishing"],
}

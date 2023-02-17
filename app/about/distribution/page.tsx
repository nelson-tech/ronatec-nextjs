import { Fragment } from "react"

import getDistributionData from "@lib/server/about/getDistributionData"

import DistributionComponent from "@components/Pages/Distribution"

// ####
// #### Component
// ####

const DistributionPage = async () => {
  const suppliers = await getDistributionData()
  return (
    <Fragment>
      <DistributionComponent suppliers={suppliers} />
    </Fragment>
  )
}

export default DistributionPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Distribution",
  description:
    "Ronatec C2C, Inc. is a certified distributer for many of the leading brands in the industry.",
  keywords: ["Distribution", "Suppliers", "Ronatec", "Metal Finishing"],
}

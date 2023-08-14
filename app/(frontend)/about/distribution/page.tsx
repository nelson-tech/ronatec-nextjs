import getDistributionData from "./about.distribution.load"

import PageHeader from "@components/PageHeader"

import DistributionComponent from "./Distribution"

// ####
// #### Component
// ####

const DistributionPage = async () => {
  const suppliers = await getDistributionData()
  return (
    <>
      <div className="mx-auto px-8 lg:max-w-7xl">
        <PageHeader title="Distribution" />
        <DistributionComponent suppliers={suppliers} />
      </div>
    </>
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

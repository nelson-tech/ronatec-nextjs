import { GetDistributionDataDocument, Supplier } from "@api/codegen/graphql"
import useClient from "@api/client"

import DistributionComponent from "@components/Pages/Distribution"

// ####
// #### Server Calls
// ####

const getDistributionData = async () => {
  const client = useClient()

  const distributionData = await client.request(GetDistributionDataDocument)

  return distributionData.suppliers?.nodes
}

// ####
// #### Component
// ####

const DistributionPage = async () => {
  const suppliers = await getDistributionData()
  return (
    <>
      <DistributionComponent suppliers={suppliers as Supplier[]} />
    </>
  )
}

export default DistributionPage

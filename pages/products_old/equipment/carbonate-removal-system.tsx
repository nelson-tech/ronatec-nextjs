import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import CarbonateRemovalSystemComponent from "@components/Pages/Products/CarbonateRemovalSystem"

// ####
// #### Component
// ####

const CarbonateRemovalSystem = () => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Ronatec Carbonate Removal System"
          description="The Ronatec DeCarb is the premier domestically designed and
      manufactured sodium carbonate removal system."
        />

        <CarbonateRemovalSystemComponent />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(CarbonateRemovalSystem)

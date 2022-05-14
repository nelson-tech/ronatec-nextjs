import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import HeatedTankSystemComponent from "@components/Pages/Products/HeatedTankSystem"

// ####
// #### Component
// ####

const HeatedTankSystem = () => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Heated Tank System"
          description="Our system evaporates water from process solutions and waste
      waters under atmospheric conditions."
        />

        <HeatedTankSystemComponent />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(HeatedTankSystem)

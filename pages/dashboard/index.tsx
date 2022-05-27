import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

// ####
// #### Component
// ####

const Dashboard = ({}) => {
  return (
    <>
      <Layout>
        <PageTitle
          title="User Dashboard"
          description="User information and settings."
          banner={false}
        />

        <div className="p-8">User Dashboard</div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Dashboard)

import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import RegisterForm from "@components/RegisterForm"

// ####
// #### Component
// ####

const Register = ({}) => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Register"
          description="Register an account to track future orders."
          banner={false}
        />

        <RegisterForm />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Register)

import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import ResetPasswordForm from "@components/ResetPasswordForm"

// ####
// #### Component
// ####

const ResetPassword = ({}) => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Reset Password"
          description="Reset your account password."
          banner={false}
        />

        <ResetPasswordForm />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(ResetPassword)

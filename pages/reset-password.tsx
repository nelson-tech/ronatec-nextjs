import PageTitle from "@components/PageTitle"
import dynamic from "next/dist/shared/lib/dynamic"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const ResetPasswordForm = dynamic(
  () => import("@components/ResetPasswordForm"),
  importOpts,
)

// ####
// #### Component
// ####

const ResetPassword = ({}) => {
  return (
    <>
      <PageTitle
        title="Reset Password"
        description="Reset your account password."
        banner={false}
      />

      <ResetPasswordForm />
    </>
  )
}

export default ResetPassword

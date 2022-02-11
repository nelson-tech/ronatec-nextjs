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
      <div>
        <ResetPasswordForm />
      </div>
    </>
  )
}

export default ResetPassword

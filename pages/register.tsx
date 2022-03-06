import dynamic from "next/dist/shared/lib/dynamic"

import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const RegisterForm = dynamic(
  () => import("@components/RegisterForm"),
  importOpts,
)

// ####
// #### Component
// ####

const Register = ({}) => {
  return (
    <>
      <PageTitle
        title="Register"
        description="Register an account to track future orders."
        banner={false}
      />

      <RegisterForm />
    </>
  )
}

export default Register

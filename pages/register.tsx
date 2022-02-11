import dynamic from "next/dist/shared/lib/dynamic"

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
    <div>
      <RegisterForm />
    </div>
  )
}

export default Register

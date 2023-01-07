import AuthChecker from "@components/AuthChecker"
import RegisterForm from "@components/RegisterForm"

// ####
// #### Component
// ####

const RegisterPage = ({
  searchParams,
}: {
  searchParams?: { redirect: string }
}) => {
  return (
    <>
      <AuthChecker
        forceGuest
        redirect={`/${searchParams?.redirect ?? "products"}`}
      ></AuthChecker>
      <RegisterForm />
    </>
  )
}

export default RegisterPage

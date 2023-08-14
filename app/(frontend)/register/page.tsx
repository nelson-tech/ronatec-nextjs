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
      />
      <RegisterForm />
    </>
  )
}

export default RegisterPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Register",
  description: "Register an account to place orders and track previous orders.",
  keywords: ["Register", "Shop", "Ronatec", "Metal Finishing"],
}

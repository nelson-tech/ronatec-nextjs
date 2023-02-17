import AuthChecker from "@components/AuthChecker"
import LoginForm from "@components/LoginForm"

const LoginPage = ({
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
      <LoginForm />
    </>
  )
}

export default LoginPage

export const revalidate = 0 // dynamically serve this page

export const metadata = {
  title: "Login",
  description:
    "Login to your account to place orders and track previous orders.",
  keywords: ["Login", "Shop", "Ronatec", "Metal Finishing"],
}

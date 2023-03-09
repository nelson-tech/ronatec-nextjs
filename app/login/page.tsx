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

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Login",
  description:
    "Login to your account to place orders and track previous orders.",
  keywords: ["Login", "Shop", "Ronatec", "Metal Finishing"],
}

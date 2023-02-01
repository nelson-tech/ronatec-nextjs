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

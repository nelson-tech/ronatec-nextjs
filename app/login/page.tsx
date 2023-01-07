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
        redirect={`/${searchParams?.redirect ?? "shop"}`}
      />
      <LoginForm />
    </>
  )
}

export default LoginPage

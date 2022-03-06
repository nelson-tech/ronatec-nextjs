import { useEffect } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"

import useAuth from "@lib/hooks/useAuth"

import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const LoginForm = dynamic(() => import("@components/LoginForm"), importOpts)

const Login = ({}) => {
  const { loggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loggedIn) {
      const rederict = (router.query?.redirect as string) || undefined
      router.push(rederict || "/products/")
    }
  }, [router, loggedIn])

  return (
    <>
      <PageTitle
        title="Login"
        description="Login to your account to see past orders."
        banner={false}
      />

      <LoginForm />
    </>
  )
}

export default Login

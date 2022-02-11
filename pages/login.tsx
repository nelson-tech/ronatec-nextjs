import { useEffect } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { useRouter } from "next/dist/client/router"

import useAuth from "@lib/hooks/useAuth"

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

  return <LoginForm />
}

export default Login

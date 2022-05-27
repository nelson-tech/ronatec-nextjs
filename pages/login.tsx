import { useEffect } from "react"
import { useRouter } from "next/dist/client/router"

import useStore from "@lib/hooks/useStore"
import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import LoginForm from "@components/LoginForm"

// ####
// #### Component
// ####

const Login = ({}) => {
  const router = useRouter()

  const loggedIn = useStore(state => state.auth.loggedIn)

  useEffect(() => {
    if (loggedIn) {
      const rederict = (router.query?.redirect as string) || undefined
      router.push(rederict || "/products/")
    }
  }, [router, loggedIn])

  return (
    <>
      <Layout>
        <PageTitle
          title="Login"
          description="Login to your account to see past orders."
          banner={false}
        />

        <LoginForm />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Login)

import { useEffect } from "react"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useAuth, useMainMenu } from "@lib/hooks"
import { getGeneralPageData } from "@api/queries/pages"
import { normalize } from "@api/utils"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const LoginForm = dynamic(() => import("@components/LoginForm"), importOpts)

const Login = ({
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = initializeApollo({})

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import dynamic from "next/dynamic"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { normalize } from "@api/utils"
import { getGeneralPageData } from "@api/queries/pages"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const RegisterForm = dynamic(
  () => import("@components/RegisterForm"),
  importOpts,
)

// ####
// #### Component
// ####

const Register = ({
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default Register

// ####
// #### External Props
// ####

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

import { getGeneralPageData } from "@api/queries/pages"
import { normalize } from "@api/utils"
import { SignIn } from "@components"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"

const Login = ({
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)
  return <SignIn />
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

  console.log("MENU", menuError)

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

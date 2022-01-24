import { getGeneralPageData } from "@api/queries/pages"
import { normalize } from "@api/utils"
import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { InferGetStaticPropsType } from "next"

const Dashboard = ({
  // page,
  menuItems,
}: // loading,
// error,
InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)
  return <div>User Dashboard</div>
}

export default Dashboard

export async function getStaticProps() {
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
    props: {
      // loading,
      // page,
      menuItems,
      // error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

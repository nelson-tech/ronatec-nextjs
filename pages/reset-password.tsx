import { InferGetStaticPropsType } from "next"

import { addApolloState, initializeApollo } from "@lib/apollo"
import { useMainMenu } from "@lib/hooks"
import { normalize } from "@api/utils"
import { getGeneralPageData } from "@api/queries/pages"
import { ResetPasswordForm } from "@components"

const ResetPassword = ({
  // page,
  menuItems,
}: // loading,
// error,
InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMenu } = useMainMenu()
  menuItems && setMenu(menuItems)

  return (
    <>
      <div>
        <ResetPasswordForm />
      </div>
    </>
  )
}

export default ResetPassword

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

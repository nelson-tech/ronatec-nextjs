import useClient from "@api/client"
import { GetViewerDocument } from "@api/codegen/graphql"
import ResetPasswordForm from "@components/ResetPasswordForm"
import getTokens from "@lib/utils/getTokens"

const getUserEmail = async () => {
  const { tokens } = getTokens()

  const client = useClient(tokens)

  const userData = await client.request(GetViewerDocument)

  return userData.viewer?.email
}

const ResetPasswordPage = async () => {
  const detectedEmail = await getUserEmail()

  return (
    <>
      <ResetPasswordForm detectedEmail={detectedEmail} />
    </>
  )
}

export default ResetPasswordPage

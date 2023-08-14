import ResetPasswordForm from "@components/ResetPasswordForm"
import getPayloadAndUser from "@server/utils/getPayloadAndUser"

const getCustomerEmail = async () => {
  const { user } = await getPayloadAndUser()

  return user?.email
}

const ResetPasswordPage = async () => {
  const detectedEmail = await getCustomerEmail()

  return (
    <>
      <ResetPasswordForm detectedEmail={detectedEmail} />
    </>
  )
}

export default ResetPasswordPage

export const metadata = {
  title: "Reset Password",
  description:
    "Reset your password easily with your email address if you've forgotten it.",
  keywords: [
    "Reset Password",
    "Account",
    "Shop",
    "Ronatec",
    "Metal Finishing",
    "Chemicals",
    "Industrial Chemicals",
  ],
}

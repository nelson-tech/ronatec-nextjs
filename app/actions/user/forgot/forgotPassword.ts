import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"

export const forgotPassword = async (req: Request, res: Response) => {
  const data: { email?: string } = await req.json()

  console.log("Data", data)

  const { payload, user } = await getPayloadAndUser()

  if (data.email) {
    const token = await payload.forgotPassword({
      collection: "users",
      data: { email: data.email },
      disableEmail: true,
    })

    console.log("Token", token)
  }

  return NextResponse.json({ message: "Okrrr" })
}

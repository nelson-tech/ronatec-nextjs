import getPayloadAndUser from "@server/utils/getPayloadAndUser"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log("YASS")

  const { payload, user } = await getPayloadAndUser()

  return NextResponse.json({ data: payload.config })
}

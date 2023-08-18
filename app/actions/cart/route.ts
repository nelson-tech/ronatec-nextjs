import getPayloadAndUser from "@server/getPayloadAndUser"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { payload, user } = await getPayloadAndUser()

  return NextResponse.json({})
}

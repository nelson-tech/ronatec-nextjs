import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  console.log("Simple POST hit!")
  return NextResponse.json({ success: true, message: "Simple POST works" })
}

export async function GET(req: Request) {
  console.log("Simple GET hit!")
  return NextResponse.json({ success: true, message: "Simple GET works" })
}

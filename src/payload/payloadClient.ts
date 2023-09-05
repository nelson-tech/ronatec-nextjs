import dotenv from "dotenv"
import path from "path"
import payload, { type Payload } from "payload"
import type { InitOptions } from "payload/config"

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
})

const MONGODB_URI = process.env.MONGODB_URI ?? ""
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET ?? ""

const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = process.env.MAIL_PORT

let cached: {
  client: Payload | null
  promise: Promise<Payload> | null
} = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing")
  }

  if (!PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is missing")
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      mongoURL: MONGODB_URI,
      secret: PAYLOAD_SECRET,
      email: {
        transportOptions: {
          host: MAIL_HOST,
          auth: { user: MAIL_USERNAME, pass: MAIL_PASSWORD },
          port: Number.parseInt(MAIL_PORT ?? "587"),
          // secure: true,
        },
        fromName: "Ronatec C2C, Inc.",
        fromAddress: "michael@ronatec.us",
      },
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
export default getPayloadClient

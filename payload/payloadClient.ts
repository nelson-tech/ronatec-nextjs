import { Payload, getPayload } from "payload/dist/payload"
import config from "./payload.config"

const MONGODB_URI = process.env.MONGODB_URI ?? ""
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET ?? ""

const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = process.env.MAIL_PORT

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is missing")
}

if (!PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET environment variable is missing")
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 *
 * Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */
let cached: {
  client: Payload | null
  promise: Promise<Payload> | null
} = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({
      // Make sure that your environment variables are filled out accordingly
      mongoURL: MONGODB_URI,
      secret: PAYLOAD_SECRET,
      config: config,
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
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}

export default getPayloadClient

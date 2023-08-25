import isValidSignature from "./isValidSignature"
import { WCWH_Event, WCWH_Resource } from "./types"

type GetWebhookDataReturn<T> =
  | {
      isValid: false
      data: null
      resource: null
      event: null
    }
  | {
      isValid: true
      data: T
      resource: WCWH_Resource
      event: WCWH_Event
    }

const getWebhookData = async <T>(req): Promise<GetWebhookDataReturn<T>> => {
  const { headers } = req
  const signature = headers.get("x-wc-webhook-signature") as string

  const secret = process.env.WEBHOOK_SECRET
  const bodyAsText = await req.text()
  const isValid = isValidSignature(secret, bodyAsText, signature)

  if (!isValid) {
    return { isValid, data: null, resource: null, event: null }
  }

  const data = bodyAsText ? JSON.parse(bodyAsText) || null : null

  const resource = headers.get("x-wc-webhook-resource") as WCWH_Resource
  const event = headers.get("x-wc-webhook-event") as WCWH_Event

  return {
    isValid,
    data,
    resource,
    event,
  }
}

export default getWebhookData

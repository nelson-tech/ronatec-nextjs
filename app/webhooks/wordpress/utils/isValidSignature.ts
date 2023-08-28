import { createHmac } from "crypto"

const isValidSignature = (
  secret: string | undefined,
  body: string,
  signature: string
) => {
  if (secret) {
    const signatureComputed = createHmac("SHA256", secret)
      .update(Buffer.from(body, "utf8"))
      .digest("base64")

    return signatureComputed === signature ? true : false
  }

  return false
}

export default isValidSignature

import { createHmac } from "crypto"

const isValidSignature = (secret, body, signature) => {
  const signatureComputed = createHmac("SHA256", secret)
    .update(Buffer.from(body, "utf8"))
    .digest("base64")

  return signatureComputed === signature ? true : false
}

export default isValidSignature

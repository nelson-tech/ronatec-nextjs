import type { Config } from "payload/generated-types"
import getPayloadClient from "~payload/payloadClient"

const getGlobalData = async <T extends keyof Config["globals"]>(
  slug: T
): Promise<Config["globals"][T] | null> => {
  const client = await getPayloadClient()
  try {
    const data = await client.findGlobal({ slug })

    return data as Config["globals"][typeof slug]
  } catch (error) {
    console.warn(`Error in getGlobalData with slug: ${slug}`, error)

    return null
  }
}

export default getGlobalData

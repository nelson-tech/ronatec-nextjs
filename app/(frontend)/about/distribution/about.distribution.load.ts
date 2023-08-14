import getPayloadClient from "~payload/payloadClient"

const getDistributionData = async () => {
  const client = await getPayloadClient()
  try {
    const data = await client.find({ collection: "suppliers", limit: 999 })
    return data.docs
  } catch (error) {
    console.warn("Error in getDistributionData:", error)

    return null
  }
}

export default getDistributionData

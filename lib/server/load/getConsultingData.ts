import getPayloadClient from "~payload/payloadClient"

const getConsultingData = async () => {
  const client = await getPayloadClient()
  try {
    const data = await client.findGlobal({ slug: "consulting" })

    return data
  } catch (error) {
    console.warn("Error in getConsultingData", error)

    return null
  }
}

export default getConsultingData

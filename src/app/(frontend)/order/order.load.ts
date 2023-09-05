import getPayloadAndUser from "@server/getPayloadAndUser"

const getOrderById = async (number: string | undefined) => {
  if (number) {
    try {
      const { payload, user } = await getPayloadAndUser()

      const data = await payload.find({
        collection: "orders",
        where: { orderNumber: { equals: number } },
        overrideAccess: false,
        user,
      })

      return data
    } catch (error) {
      console.warn("Error in getOrderById:", error)
    }
  }
  return null
}

export default getOrderById

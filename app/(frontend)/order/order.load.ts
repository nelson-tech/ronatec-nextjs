import getPayloadAndUser from "@server/utils/getPayloadAndUser"

const getOrderById = async (number: string | undefined) => {
  if (number) {
    try {
      const { payload, user } = await getPayloadAndUser()

      const data = await payload.findByID({
        collection: "orders",
        id: number,
        overrideAccess: true,
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

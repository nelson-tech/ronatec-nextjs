import getPayloadAndUser from "@server/utils/getPayloadAndUser"

const getOrders = async () => {
  const { payload, user } = await getPayloadAndUser()

  try {
    const ordersData = await payload.find({
      collection: "orders",
      where: { user: { equals: user?.id } },
    })

    return ordersData
  } catch (error) {
    console.warn("Error fetching orders", error)

    return null
  }
}

export default getOrders

import getPayloadAndUser from "@server/utils/getPayloadAndUser"

const createCart = async () => {
  const { payload, user } = await getPayloadAndUser()
}

export default createCart

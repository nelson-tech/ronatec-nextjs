import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Order } from "~payload-types"

const setPending: BeforeChangeHook<Order> = async ({ req, data }) => {
  if (!data.status) {
    data.status = "pending"
  }
  return data
}

export default setPending

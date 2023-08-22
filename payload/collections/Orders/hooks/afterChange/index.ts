import { AfterChangeHook } from "payload/dist/collections/config/types"
// import syncUser from "./syncUser"
import destroyCart from "./destroyCart"
import syncUser from "./syncUser"
import updateUserContact from "./updateUserContact"
import sendNotification from "./sendNotification/sendNotifications"

const afterChange: AfterChangeHook[] = [
  sendNotification,
  destroyCart,
  syncUser,
  updateUserContact,
]

export default afterChange

import { AfterChangeHook } from "payload/dist/collections/config/types"
// import syncUser from "./syncUser"
import destroyCart from "./destroyCart"
import syncUser from "./syncUser"
import updateUserContact from "./updateUserContact"
import sendNotification from "./sendNotification/sendNotifications"
import updateSold from "./updateSold"
import updateOrdered from "./updateOrdered"

const afterChange: AfterChangeHook[] = [
  sendNotification,
  destroyCart,
  syncUser,
  updateUserContact,
  updateOrdered,
  updateSold,
]

export default afterChange

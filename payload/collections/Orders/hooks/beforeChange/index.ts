import { BeforeChangeHook } from "payload/dist/collections/config/types"
import addOrderNumber from "./addOrderNumber"
import sendNotification from "./sendNotification"
import setPending from "./setPending"

const beforeChange: BeforeChangeHook[] = [
  addOrderNumber,
  setPending,
  sendNotification,
]

export default beforeChange

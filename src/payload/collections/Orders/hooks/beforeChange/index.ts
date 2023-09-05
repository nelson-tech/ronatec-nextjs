import { BeforeChangeHook } from "payload/dist/collections/config/types"
import addOrderNumber from "./addOrderNumber"
import setPending from "./setPending"
import calculateTotals from "~payload/hooks/collection/beforeChange/calculateTotals"

const beforeChange: BeforeChangeHook[] = [
  addOrderNumber,
  setPending,
  calculateTotals,
]

export default beforeChange

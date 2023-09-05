import { CollectionBeforeChangeHook } from "payload/types"
import updateCountHook from "./updateCount"
import calculateTotals from "~payload/hooks/collection/beforeChange/calculateTotals"

const beforeChange: CollectionBeforeChangeHook[] = [
  updateCountHook,
  calculateTotals,
]

export default beforeChange

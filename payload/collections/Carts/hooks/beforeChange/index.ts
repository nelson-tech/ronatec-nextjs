import { CollectionBeforeChangeHook } from "payload/types"
import updateCountHook from "./updateCount"
import updateLastEdit from "./updateLastEdit"
import calculateTotals from "~payload/hooks/collection/beforeChange/calculateTotals"

const beforeChange: CollectionBeforeChangeHook[] = [
  updateCountHook,
  updateLastEdit,
  calculateTotals,
]

export default beforeChange

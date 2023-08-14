import { CollectionBeforeChangeHook } from "payload/types"
import updateCountHook from "./updateCount"
import updateLastEdit from "./updateLastEdit"

const beforeChange: CollectionBeforeChangeHook[] = [
  updateCountHook,
  updateLastEdit,
]

export default beforeChange

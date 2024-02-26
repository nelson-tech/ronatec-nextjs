import type { CollectionBeforeChangeHook } from "payload/types"
import updateCountAndUsed from "./updateCountAndUsed"

const beforeChange: CollectionBeforeChangeHook[] = [updateCountAndUsed]

export default beforeChange

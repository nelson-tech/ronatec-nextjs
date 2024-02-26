import checkVariations from "./checkVariations"
import setUsed from "./setUsed"

import type { CollectionBeforeChangeHook } from "payload/types"

const beforeChange: CollectionBeforeChangeHook[] = [checkVariations, setUsed]

export default beforeChange

import type { CollectionAfterChangeHook } from "payload/types"

import updateUserHook from "./updateUser"

const afterChange: CollectionAfterChangeHook[] = [updateUserHook]

export default afterChange

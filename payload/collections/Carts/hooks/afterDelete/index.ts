import type { CollectionAfterDeleteHook } from "payload/types"

import updateUser from "./updateUser"

const afterDelete: CollectionAfterDeleteHook[] = [updateUser]

export default afterDelete

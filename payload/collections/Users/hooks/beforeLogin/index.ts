import { CollectionBeforeLoginHook } from "payload/types"
import handleGuestCart from "./handleGuestCart"

const beforeLogin: CollectionBeforeLoginHook[] = [handleGuestCart]

export default beforeLogin

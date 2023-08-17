import { BeforeChangeHook } from "payload/dist/collections/config/types"
import updateFullName from "./updateFullName"

const beforeChange: BeforeChangeHook[] = [updateFullName]

export default beforeChange

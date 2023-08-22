import { BeforeChangeHook } from "payload/dist/collections/config/types"
import addOrderNumber from "./addOrderNumber"
import setPending from "./setPending"

const beforeChange: BeforeChangeHook[] = [addOrderNumber, setPending]

export default beforeChange

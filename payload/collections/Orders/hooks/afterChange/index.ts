import { AfterChangeHook } from "payload/dist/collections/config/types"
// import syncUser from "./syncUser"
import destroyCart from "./destroyCart"

const afterChange: AfterChangeHook[] = [destroyCart]

export default afterChange

import { BeforeChangeHook } from "payload/dist/collections/config/types"
import checkVariations from "./checkVariations"

const beforeChange: BeforeChangeHook[] = [checkVariations]

export default beforeChange

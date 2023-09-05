import { AfterReadHook } from "payload/dist/collections/config/types"
import test from "./test"

const afterRead: AfterReadHook[] = [test]

export default afterRead

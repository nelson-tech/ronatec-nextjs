import {
  AfterChangeHook,
  AfterDeleteHook,
  AfterReadHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types"

export type CollectionHooks = {
  beforeChange?: BeforeChangeHook[]
  afterChange?: AfterChangeHook[]
  afterRead?: AfterReadHook[]
  afterDelete?: AfterDeleteHook[]
}

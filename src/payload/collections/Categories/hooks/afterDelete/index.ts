import { AfterDeleteHook } from "payload/dist/collections/config/types"
import removeParentFromCategories from "./removeParentFromCategories"
// import removeCategoryFromProduct from "./removeCategoryFromProducts"

const afterDelete: AfterDeleteHook[] = [
  removeParentFromCategories,
  // removeCategoryFromProduct,
]

export default afterDelete

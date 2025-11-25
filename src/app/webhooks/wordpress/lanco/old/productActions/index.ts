import { WCWH_Event, WCWH_Product } from "../../utils/types"
import deleteProduct from "./deleteProduct"
import { updateProduct } from "./updateProduct"

type ProductActionsArgs<T> = {
  data: WCWH_Product
  event: WCWH_Event
  lanco?: boolean
}

const productActions = async <T>({
  data,
  event,
  lanco,
}: ProductActionsArgs<T>) => {
  let message: string | undefined
  switch (event) {
    case "created":
      message = await updateProduct(data, lanco)
      break
    case "updated":
      message = await updateProduct(data, lanco)
      break
    case "deleted":
      message = await deleteProduct(data)
      break
    case "restored":
      message = await updateProduct(data, lanco)
      break

    default:
      break
  }

  return message
}

export default productActions

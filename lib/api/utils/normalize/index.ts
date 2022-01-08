import { normalizeCards } from "./cards"
import { normalizeLinkCards } from "./cards"
import { normalizeImageCards } from "./cards"
import { normalizeImage } from "./images"
import { normalizeImages } from "./images"
import { normalizeSupplier } from "./suppliers"
import { normalizeEmployees } from "./employees"
import { normalizeSalesReps } from "./employees"
import { normalizeMenu } from "./menu"

const exports = {
  image: normalizeImage,
  images: normalizeImages,
  supplier: normalizeSupplier,
  cards: normalizeCards,
  linkCards: normalizeLinkCards,
  imageCards: normalizeImageCards,
  employees: normalizeEmployees,
  salesReps: normalizeSalesReps,
  menu: normalizeMenu,
}

export default exports

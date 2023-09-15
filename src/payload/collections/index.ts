import Categories from "./Categories"
import Media from "./Media"
import Orders from "./Orders"
import Products from "./Products"
import Users from "./Users"
import Carts from "./Carts"
import Suppliers from "./Suppliers"
import Employees from "./Employees"
import Tags from "./Tags"
import Pages from "./Pages"

import type { CollectionConfig } from "payload/types"

const collections: CollectionConfig[] = [
  Pages,
  Media({ slug: "images" }),
  Media({ slug: "videos" }),
  Media({ slug: "productImages" }),
  Media({ slug: "documents" }),
  Products,
  Categories,
  Tags,
  Carts,
  Orders,
  Users,
  Employees,
  Suppliers,
]

export default collections

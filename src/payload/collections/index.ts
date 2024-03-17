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
import Chemicals from "./Chemicals"
import NewsArticles from "./NewsArticles"
import Manufacturers from "./Manufacturers"
import Industries from "./Industries"

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
  Manufacturers,
  Industries,
  Chemicals,
  NewsArticles,
  Employees,
  Suppliers,
]

export default collections

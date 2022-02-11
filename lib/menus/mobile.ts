import about from "./about"
import chemicals from "./chemicals"
import ronaBev from "./ronabev"
import ronaTank from "./ronatank"
import services from "./services"
import MenuItemType from "./types"

const mobileMenu: MenuItemType[] = [
  {
    id: "cG9zdDo1MTg=",
    label: "Shop",
    path: "/products",
    children: [
      chemicals,
      ronaBev,
      ronaTank,
      {
        id: "cG9zdDo1MjbE=",
        label: "Used Equipment",
        path: "/products/used-equipment",
        children: null,
      },
    ],
    mega: true,
  },
  services,
  about,
]

export default mobileMenu

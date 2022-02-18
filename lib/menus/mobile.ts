import about from "./about"
import chemicals from "./chemicals"
import equipment from "./equipment"
import ronaBev from "./ronabev"
import ronaTank from "./ronatank"
import services from "./services"
import MenuItemType from "./types"

const mobileMenu: MenuItemType[] = [
  {
    id: "cG9zdDo1MTg=",
    label: "Shop",
    path: "/products",
    children: [chemicals, ronaBev, ronaTank, equipment],
    mega: true,
  },
  services,
  about,
]

export default mobileMenu

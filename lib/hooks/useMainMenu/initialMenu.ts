import { NormalizedMenuItem } from "@lib/types"

export const initialMenu: NormalizedMenuItem[] = [
  {
    id: "Home",
    path: "/",
    label: "Home",
    children: null,
  },
  {
    id: "Products",
    path: "/products",
    label: "Products",
    children: null,
  },
  {
    id: "RonaBev",
    path: "/products/ronabev",
    label: "Ronabev",
    children: null,
  },
  {
    id: "RonaTank",
    path: "/products/ronatank",
    label: "RonaTank",
    children: null,
  },
  {
    id: "Consulting",
    path: "/services/consulting",
    label: "Consulting",
    children: null,
  },
  {
    id: "Company",
    path: "/about",
    label: "Company",
    children: null,
  },
]

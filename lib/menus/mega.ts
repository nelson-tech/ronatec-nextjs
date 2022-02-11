import chemicals from "./chemicals"
import ronaBev from "./ronabev"
import ronaTank from "./ronatank"
import MenuItemType from "./types"

const megaMenu: MenuItemType = {
  id: "cG9zdDo1MTg=",
  label: "Shop",
  path: "/shop",
  children: [
    {
      id: "cG9zdDo1MjaE=",
      label: "Menu-Column",
      path: "#",
      children: [
        {
          id: "cG9zdDo1MjcE=",
          label: "Browse All",
          path: "/products",
          children: null,
        },
        chemicals,
        {
          id: "cG9zdDo1MjbE=",
          label: "Used Equipent",
          path: "/products/used-equipment",
          children: null,
        },
      ],
    },
    {
      id: "cG9zdDo1MjaEa=",
      label: "Menu-Column",
      path: "#",
      children: [
        {
          id: "",
          label: "Metal Finishing",
          path: "/products/metal-finishing",
          children: [
            {
              id: "",
              label: "Electroless Nickel Plating",
              path: "/products/metal-finishing/electroless-nickel-plating",
              children: null,
            },
            {
              id: "",
              label: "Trivalent Chrome Plating Processes",
              path: "/products/metal-finishing/trivalent-chrome-plating-processes",
              children: null,
            },
            {
              id: "",
              label: "Specialty Coatings",
              path: "/products/metal-finishing/specialty-coatings",
              children: null,
            },
            {
              id: "",
              label: "Nickel & Chrome Plating",
              path: "/products/metal-finishing/nickel-chrome-plating",
              children: null,
            },
            {
              id: "",
              label: "Anodizing - Deoxidizers",
              path: "/products/metal-finishing/anodizing-deoxidizers",
              children: null,
            },
            {
              id: "",
              label: "Zinc Plating",
              path: "/products/metal-finishing/zinc-plating",
              children: null,
            },
            {
              id: "",
              label: "Tin Plating",
              path: "/products/metal-finishing/tin-plating",
              children: null,
            },
            {
              id: "",
              label: "Phosphate",
              path: "/products/metal-finishing/phosphate",
              children: null,
            },
            {
              id: "",
              label: "Stripping",
              path: "/products/metal-finishing/Stripping",
              children: null,
            },
          ],
        },
      ],
    },
    {
      id: "cG9zdDo1Nzc=",
      label: "Menu-Column",
      path: "#",
      children: [ronaBev, ronaTank],
    },
  ],
  mega: true,
}

export default megaMenu

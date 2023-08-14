import { GlobalConfig } from "payload/types"
import link from "../fields/link"
import buildMenuLinks from "../fields/menuLink"
import buildMobileLinks from "../fields/mobileLink"

const Menus: GlobalConfig = {
  slug: "menus",
  access: {
    read: () => true,
  },
  admin: {
    group: "Global",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "mainMenu",
          label: "Main Menu",
          fields: [
            {
              name: "links",
              type: "array",
              label: "Links",
              interfaceName: "MainMenuLink",
              labels: {
                singular: "Main Menu Item",
                plural: "Main Menu Items",
              },
              fields: [buildMenuLinks({ depth: 4 })],

              admin: {
                components: {
                  RowLabel: ({ data }: any) => {
                    return data?.link?.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
        {
          name: "mobileMenu",
          label: "Mobile Menu",
          fields: [
            {
              name: "links",
              type: "array",
              label: "Links",
              interfaceName: "MobileMenuLink",
              labels: {
                singular: "Mobile Menu Item",
                plural: "Mobile Menu Items",
              },
              fields: [buildMobileLinks({ depth: 3 })],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => {
                    return data?.link?.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
        {
          name: "footerMenu",
          label: "Footer Menu",
          fields: [
            {
              name: "links",
              type: "array",
              label: "Links",
              labels: {
                singular: "Footer Menu Item",
                plural: "Footer Menu Items",
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => {
                    return data?.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Menus

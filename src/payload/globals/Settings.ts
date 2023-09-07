import type { GlobalConfig } from "payload/types"
import colorField from "../fields/colorPicker/config"

export const Settings: GlobalConfig = {
  slug: "settings",
  typescript: {
    interface: "Settings",
  },
  graphQL: {
    name: "Settings",
  },
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
          label: "Site Settings",
          fields: [
            { name: "seoTitle", label: "SEO Title", type: "text" },
            { name: "debugEmail", type: "text" },
          ],
        },
        {
          name: "logos",
          label: "Logos",
          fields: [
            { name: "main", type: "upload", relationTo: "images" },
            { name: "favIcon", type: "upload", relationTo: "images" },
          ],
        },
        {
          name: "colors",
          label: "Colors",
          fields: [colorField("primary"), colorField("secondary")],
        },
        {
          name: "promo",
          label: "Promo",
          fields: [{ name: "html", type: "textarea" }],
        },
        {
          name: "orders",
          label: "Orders",
          fields: [
            { name: "adminEmail", type: "text" },
            { name: "startingNumber", type: "number" },
          ],
        },
      ],
    },
  ],
}

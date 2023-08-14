import { GlobalConfig } from "payload/types"
import CardsArrayField from "../../fields/cardsArray"
import mapField from "../../fields/map"
import { meta } from "~payload/fields/meta"

const ContactPage: GlobalConfig = {
  slug: "contact",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  versions: true,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cards",
          fields: [CardsArrayField],
        },
        {
          label: "Map",
          fields: [mapField],
        },
        {
          label: "Sales Reps",
          fields: [
            {
              name: "salesReps",
              type: "relationship",
              relationTo: "employees",
              hasMany: true,
              admin: {
                isSortable: true,
              },
            },
          ],
        },
      ],
    },
    meta({}),
  ],
}

export default ContactPage

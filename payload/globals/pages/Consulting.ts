import { GlobalConfig } from "payload/types"
import CardsArrayField from "../../fields/cardsArray"
import { meta } from "~payload/fields/meta"

const ConsultingPage: GlobalConfig = {
  slug: "consulting",
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
          label: "Gallery",
          fields: [
            {
              name: "slides",
              type: "array",
              interfaceName: "ConsultingSlides",
              fields: [
                { name: "label", type: "text" },
                { name: "image", type: "relationship", relationTo: "images" },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => data?.label ?? "Slide",
                },
              },
            },
          ],
        },
        { label: "Content", fields: [{ name: "content", type: "textarea" }] },
        {
          label: "Certificates",
          name: "certificates",
          fields: [CardsArrayField],
        },
        {
          label: "Cards",
          name: "cards",
          fields: [CardsArrayField],
        },
      ],
    },
    {
      name: "callout",
      type: "group",
      fields: [
        { name: "content", type: "textarea" },
        { name: "style", type: "text" },
      ],
      admin: { position: "sidebar" },
    },
    meta({}),
  ],
}

export default ConsultingPage

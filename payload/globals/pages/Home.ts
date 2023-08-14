import payload from "payload"
import { meta } from "~payload/fields/meta"
import { GlobalConfig } from "payload/types"

const HomePage: GlobalConfig = {
  slug: "home",
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
          name: "hero",
          label: "Hero",
          fields: [
            { name: "title", type: "text" },
            { name: "subTitle", type: "text" },
            { name: "content", type: "textarea" },
            {
              name: "buttons",
              type: "array",
              fields: [
                { name: "label", type: "text" },
                { name: "url", label: "URL", type: "text" },
                { name: "className", type: "text" },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => data?.label ?? "Button Item",
                },
              },
            },
          ],
        },
        {
          name: "carousels",
          label: "Carousels",
          fields: [
            {
              name: "categories",
              type: "group",
              fields: [
                { name: "label", type: "text" },
                {
                  name: "link",
                  type: "group",
                  fields: [
                    { name: "label", type: "text" },
                    { name: "url", label: "URL", type: "text" },
                  ],
                },
                {
                  name: "categories",
                  type: "relationship",
                  relationTo: "categories",
                  hasMany: true,
                  // filterOptions: {
                  //   or: [
                  //     { parent: { exists: false } },
                  //     { parent: { equals: null } },
                  //   ],
                  // },
                  admin: { isSortable: true },
                },
              ],
            },
          ],
        },
        {
          label: "Cards",
          fields: [
            {
              name: "cards",
              type: "array",
              fields: [
                { name: "title", type: "text" },
                { name: "content", type: "textarea" },
                {
                  name: "icon",
                  type: "group",
                  fields: [
                    { name: "name", type: "text" },
                    {
                      name: "type",
                      type: "select",
                      options: [
                        { label: "Brand", value: "brand" },
                        { label: "Duotone", value: "duotone" },
                        { label: "Light", value: "light" },
                        { label: "Regular", value: "regular" },
                        { label: "Solid", value: "solid" },
                      ],
                      defaultValue: "regular",
                    },
                  ],
                },
                {
                  name: "link",
                  type: "group",
                  fields: [
                    { name: "label", type: "text" },
                    { name: "url", label: "URL", type: "text" },
                  ],
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => data?.title ?? "Card",
                },
              },
            },
          ],
        },
        {
          label: "Videos",
          fields: [
            {
              name: "videos",
              type: "array",
              interfaceName: "VideoLink",
              fields: [
                { name: "title", type: "text" },
                {
                  name: "provider",
                  type: "select",
                  options: [
                    { label: "Direct", value: "direct" },
                    { label: "YouTube", value: "youtube" },
                    { label: "Other", value: "other" },
                  ],
                  defaultValue: "direct",
                },
                {
                  name: "video",
                  type: "relationship",
                  relationTo: "videos",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.provider === "direct",
                  },
                },
                {
                  name: "videoId",
                  label: "Video ID",
                  type: "text",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.provider === "youtube",
                  },
                },
                {
                  name: "url",
                  label: "URL",
                  type: "text",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.provider === "other",
                  },
                },
                {
                  name: "placeholderImage",
                  type: "relationship",
                  relationTo: "images",
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }: any) => data?.title ?? "Video",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "featuredSupplier",
      type: "relationship",
      relationTo: "suppliers",
      admin: {
        position: "sidebar",
      },
    },
    meta({}),
  ],
}

export default HomePage

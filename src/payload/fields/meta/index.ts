import type { Field } from "payload/types"
import { Overview } from "./ui/Overview"
import { getMetaTitleField } from "./fields/MetaTitle"
import { PluginConfig } from "./types"
import { getMetaDescriptionField } from "./fields/MetaDescription"
import { getMetaImageField } from "./fields/MetaImage"
import { getPreviewField } from "./ui/Preview"
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"

export const meta: (config: PluginConfig) => Field = (config) => ({
  name: "meta",
  interfaceName: "Meta",
  label: config.hideLabel ? false : "SEO",
  type: "group",
  admin: { position: "sidebar" },
  fields: [
    {
      name: "overview",
      label: "Overview",
      type: "ui",
      admin: { components: { Field: Overview } },
    },
    {
      name: "title",
      type: "text",
      localized: true,
      admin: {
        components: {
          Field: (props) =>
            getMetaTitleField({ ...props, pluginConfig: config }),
        },
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      admin: {
        components: {
          Field: (props) =>
            getMetaDescriptionField({ ...props, pluginConfig: config }),
        },
      },
    },
    {
      name: "image",
      label: "Meta Image",
      type: "upload",
      localized: true,
      relationTo: config?.uploadsCollection ?? "images",
      admin: {
        description:
          "Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
        components: {
          Field: (props) =>
            getMetaImageField({ ...props, pluginConfig: config }),
        },
      },
    },
    {
      name: "keywords",
      type: "array",
      fields: [{ name: "keyword", type: "text" }],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.keyword || `Keyword ${String(index).padStart(2, "0")}`
          },
        },
      },
    },
    ...(config?.fields || []),
    {
      name: "preview",
      label: "Preview",
      type: "ui",
      admin: {
        components: {
          Field: (props) => getPreviewField({ ...props, pluginConfig: config }),
        },
      },
    },
  ],
})

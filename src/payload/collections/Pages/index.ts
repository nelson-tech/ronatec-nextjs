import type { CollectionConfig } from "payload/types"
import { publishedOnly } from "~payload/access/publishedOnly"
import FormBlock from "~payload/blocks/Form"
import { slugField } from "~payload/fields/slug"

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOnly,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              required: true,
              blocks: [FormBlock],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}

export default Pages

import type { CollectionConfig } from "payload/types"
import { admins } from "~payload/access/admins"
import { anyone } from "~payload/access/anyone"

const NewsArticles: CollectionConfig = {
  slug: "newsArticles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: admins,
    read: anyone,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    { name: "url", type: "text" },
  ],
}

export default NewsArticles

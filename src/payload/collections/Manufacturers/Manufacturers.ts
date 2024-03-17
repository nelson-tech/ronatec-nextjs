import { admins } from "~payload/access/admins"
import { anyone } from "~payload/access/anyone"

import type { CollectionConfig } from "payload/types"

const Manufacturers: CollectionConfig = {
  slug: "manufacturers",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: admins,
    read: anyone,
    update: admins,
    delete: admins,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "logo", type: "upload", relationTo: "images" },
    { name: "link", type: "text", required: true },
  ],
}

export default Manufacturers

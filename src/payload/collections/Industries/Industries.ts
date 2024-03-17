import { admins } from "~payload/access/admins"
import { anyone } from "~payload/access/anyone"

import type { CollectionConfig } from "payload/types"

const Industries: CollectionConfig = {
  slug: "industries",
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
    { name: "name", type: "text" },
    { name: "description", type: "textarea" },
  ],
}

export default Industries

import { CollectionConfig } from "payload/types"
import { admins } from "~payload/access/admins"
import { anyone } from "~payload/access/anyone"

const Chemicals: CollectionConfig = {
  slug: "chemicals",
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
    {
      name: "manufacturer",
      type: "relationship",
      relationTo: "manufacturers",
      hasMany: false,
    },
    {
      name: "industry",
      type: "relationship",
      relationTo: "industries",
      hasMany: false,
    },
    { name: "image", type: "upload", relationTo: "images" },
    { name: "tags", type: "relationship", relationTo: "tags", hasMany: true },
  ],
}

export default Chemicals

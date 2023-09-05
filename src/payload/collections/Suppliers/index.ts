import { CollectionConfig } from "payload/types"
import { anyone } from "../../access/anyone"
import { admins } from "../../access/admins"

const Suppliers: CollectionConfig = {
  slug: "suppliers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "_status"],
  },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "image", type: "relationship", relationTo: "images" },
    { name: "url", label: "URL", type: "text" },
  ],
}

export default Suppliers

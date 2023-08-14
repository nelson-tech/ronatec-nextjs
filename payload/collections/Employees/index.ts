import { CollectionConfig } from "payload/types"
import { anyone } from "../../access/anyone"
import { admins } from "../../access/admins"

const Employees: CollectionConfig = {
  slug: "employees",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "_status"],
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
    { name: "name", type: "text" },
    { name: "position", label: "Position(s)", type: "text" },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "email", type: "text" },
        {
          name: "phone",
          type: "group",
          fields: [
            { name: "orders", type: "text" },
            { name: "office", type: "text" },
            { name: "fax", type: "text" },
          ],
        },
        { name: "address", type: "textarea" },
      ],
    },
    {
      name: "regions",
      label: "Sales Regions Covered",
      type: "textarea",
      admin: {
        condition: (data, siblingData) =>
          (siblingData?.position ?? "").toLowerCase().includes("sales") ||
          (siblingData?.position ?? "").toLowerCase().includes("owner"),
      },
    },
  ],
}

export default Employees

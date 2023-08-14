import { CollectionConfig } from "payload/dist/collections/config/types"
import { slugField } from "../../fields/slug"

const Tags: CollectionConfig = {
  slug: "tags",
  admin: { group: "Shop", useAsTitle: "name" },
  fields: [{ name: "name", type: "text" }, slugField("name")],
}

export default Tags

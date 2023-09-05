import { GlobalConfig } from "payload/types"
import mapField from "../../fields/map"
import { meta } from "~payload/fields/meta"

const WarehousesPage: GlobalConfig = {
  slug: "warehouses",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  versions: true,
  fields: [mapField, meta({})],
}

export default WarehousesPage

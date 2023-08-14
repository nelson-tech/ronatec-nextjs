import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { anyone } from "../../access/anyone"
import adminsAndUser from "./access/adminsAndUser"
import { checkRole } from "../../access/checkRole"
import { loginAfterCreate } from "./hooks/loginAfterCreate"
import purgeOldCarts from "./hooks/purgeOldCarts"
import { UserFields } from "./fields"

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  auth: {
    cookies: {
      domain: "localhost",
    },
    tokenExpiration: 3 * 24 * 60 * 60, // 3 days
  },
  hooks: {
    beforeChange: [],
    afterChange: [loginAfterCreate],
    afterLogin: [purgeOldCarts],
  },
  fields: UserFields,
  timestamps: true,
}

export default Users

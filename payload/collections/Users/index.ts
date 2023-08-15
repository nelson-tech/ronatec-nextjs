import type { CollectionConfig } from "payload/types"

import { anyone } from "~payload/access/anyone"
import { admins } from "~payload/access/admins"
import adminsAndUser from "~payload/access/adminsAndUser"
import { checkRole } from "../../access/checkRole"
import { loginAfterCreate } from "./hooks/loginAfterCreate"
import purgeOldCarts from "./hooks/purgeOldCarts"
import { UserFields } from "./fields"
import beforeLogin from "./hooks/beforeLogin"

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: adminsAndUser("users", "id", "read"),
    create: anyone,
    update: adminsAndUser("users", "id", "update"),
    delete: admins,
    admin: ({ req: { user } }) => {
      console.log("User", user)
      return checkRole(["admin"], user)
    },
  },
  auth: {
    cookies: {
      domain: process.env.COOKIE_DOMAIN,
    },
    tokenExpiration: 3 * 24 * 60 * 60, // 3 days
  },
  hooks: {
    beforeChange: [],
    afterChange: [loginAfterCreate],
    afterLogin: [purgeOldCarts],
    beforeLogin,
  },
  fields: UserFields,
  timestamps: true,
}

export default Users

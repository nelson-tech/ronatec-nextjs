import type { Access } from "payload/config"

import { checkRole } from "~payload/access/checkRole"
import { Order, User } from "~payload-types"

export const adminsAndOrderedBy: Access<Order, User> = ({
  req: { user },
  data,
}) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true
    }

    return {
      user: { equals: user.id },
    }
  }

  return { user: { exists: false } }
}

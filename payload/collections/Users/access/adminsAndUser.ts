import type { Access } from "payload/types"

import { checkRole } from "../../../access/checkRole"
import { User } from "../../../payload-types"

const adminsAndUser: Access<User, User> = ({ req: { user } }) => {
  console.log("User", user)

  if (user) {
    if (checkRole(["admin"], user)) {
      console.log("User verified as administrator")

      return true
    }

    console.log("User is not administrator. Checking ID")
    return {
      id: { equals: user.id },
    }
  }
  console.log("User failed auth checks")

  return false
}

export default adminsAndUser

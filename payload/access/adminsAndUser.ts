import type { Access, Where } from "payload/types"

import { Config, User } from "payload/generated-types"
import { checkRole } from "~payload/access/checkRole"

const adminsAndUser: <T extends keyof Config["collections"]>(
  collection: T,
  userIdField: string,
  loggingLabel?: string
) => Access<Config["collections"][T], User> =
  (collection, userIdField, loggingLabel) =>
  ({ req: { user }, id }) => {
    console.log("User", collection, loggingLabel, user)

    if (user) {
      if (checkRole(["admin"], user)) {
        console.log("User verified as administrator", collection, loggingLabel)

        return true
      }

      console.log(
        "User is not administrator. Checking ID",
        collection,
        loggingLabel
      )
      return {
        [userIdField]: { equals: user.id },
      } as Where
    }
    console.log("User failed auth checks", collection, loggingLabel)
    return {
      user: { equals: null },
    }
  }

export default adminsAndUser

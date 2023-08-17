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
    loggingLabel && console.log("User", collection, loggingLabel, user)

    if (user) {
      if (checkRole(["admin"], user)) {
        loggingLabel &&
          console.log(
            "User verified as administrator",
            collection,
            loggingLabel
          )

        return true
      }

      loggingLabel &&
        console.log(
          "User is not administrator. Checking ID",
          collection,
          loggingLabel
        )
      return {
        [userIdField]: { equals: user.id },
      } as Where
    }
    loggingLabel &&
      console.log("User failed auth checks", collection, loggingLabel)
    return {
      [userIdField.split(".id").at(0) ?? "user"]: { equals: null },
    }
  }

export default adminsAndUser

import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { User } from "payload/generated-types"

const updateFullName: BeforeChangeHook<User> = async ({
  data,
  originalDoc,
}) => {
  if (data.firstName || data.lastName) {
    const firstName = data.firstName ?? originalDoc?.firstName
    const lastName = data.lastName ?? originalDoc?.lastName

    const fullName = `${firstName ? `${firstName} ` : ""}${
      lastName ? lastName : ""
    }`

    console.log("Full name", fullName)

    data.fullName = fullName
  }

  return data
}

export default updateFullName

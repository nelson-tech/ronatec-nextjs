import { Payload } from "payload"
import { AfterChangeHook } from "payload/dist/collections/config/types"
import { Order } from "~payload-types"

const updateUserContact: AfterChangeHook<Order> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const payload = req.payload as Payload

  const userId =
    typeof doc.user === "object"
      ? doc.user.id
      : doc.user
      ? doc.user
      : typeof previousDoc.user === "object"
      ? previousDoc.user.id
      : previousDoc.user

  if (userId && doc.contact) {
    const user = await payload.update({
      collection: "users",
      id: userId,
      data: {
        ...(doc.contact.billing && { billing: doc.contact.billing }),
        ...(doc.contact.shipping && { shipping: doc.contact.shipping }),
      },
    })
  }
}

export default updateUserContact

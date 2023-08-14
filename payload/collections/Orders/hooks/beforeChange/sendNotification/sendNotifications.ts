// sync user purchases and delete their cart when they place an order

import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"
import type { SendMailOptions } from "nodemailer"

const sendNotification: BeforeChangeHook<Order> = async ({
  req,
  data,
  originalDoc,
  // operation
}) => {
  if (!data.notified && typeof data.user === "object") {
    if (originalDoc?.notified) {
      // update notification
      console.log("Should send an update notification.")
    } else {
      // first notification
      // notify customer
      const customerEmail: SendMailOptions = {
        to: data?.user?.email,
        subject: `Ronatec C2C | Order #${data.orderNumber} received!`,
        html: `<h1>Ronatec C2C, Inc</h1> <br> <h5>Order #${data.orderNumber} has been received!</h5><br /><p>A sales representative will contact you soon to complete your order.`,
      }
      req.payload.sendEmail(customerEmail)

      // notify admin

      const adminEmail: SendMailOptions = {
        to: (await req.payload.findGlobal({ slug: "settings" })).orders
          .adminEmail,
        subject: `New order placed!`,
        html: `<h2>New order placed!</h2><br /><p>Order #${data.orderNumber} has been placed by ${data.user?.firstName} ${data.user.lastName}!`,
      }
      req.payload.sendEmail(adminEmail)

      // set order as notified
      data.notified = true
    }
  }
}

export default sendNotification

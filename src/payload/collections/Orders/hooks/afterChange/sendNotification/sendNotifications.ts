// sync user purchases and delete their cart when they place an order

import { AfterChangeHook } from "payload/dist/collections/config/types"
import { Order } from "~payload-types"
import type { SendMailOptions } from "nodemailer"
import receipt from "./html/receipt"
import adminNotification from "./html/adminNotification"

const sendNotification: AfterChangeHook<Order> = async ({
  req,
  doc,
  operation,
}) => {
  if (operation === "create") {
    // first notification
    // notify customer
    const customerEmail: SendMailOptions = {
      to: doc.contact.billing.email,
      subject: `Ronatec C2C | Order #${doc.orderNumber} received!`,
      html: receipt(doc),
    }
    req.payload.sendEmail(customerEmail)

    // notify admin

    const adminEmail: SendMailOptions = {
      to: (await req.payload.findGlobal({ slug: "settings" })).orders
        .adminEmail,
      subject: `New order placed! | Order #${doc.orderNumber}`,
      html: adminNotification(doc),
    }
    req.payload.sendEmail(adminEmail)
  } else {
    // update notification
    console.log("Should send an update notification.")
  }
}

export default sendNotification

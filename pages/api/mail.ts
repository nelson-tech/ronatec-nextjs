import type { NextApiRequest, NextApiResponse } from "next"
import * as nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
require("dotenv").config()

const USERNAME = process.env.MAIL_USERNAME
const PASSWORD = process.env.MAIL_PASSWORD

export default function (req: NextApiRequest, res: NextApiResponse) {
  const smtpConfig = {
    service: "gmail",
    auth: {
      user: USERNAME || "",
      pass: PASSWORD || "",
    },
  }

  const transporter = nodemailer.createTransport(smtpConfig)

  const mailData = {
    from: `${req.body["Contact - Name"]} <${req.body["Contact - Email"]}>`,
    to: "Website Forms <michael@ronatec.us>",
    subject: "Website Quote Request",
    replyTo: req.body["Contact - Email"],
    html: `<div>
    ${Object.keys(req.body).map(key => {
      return `<h2>${key}</h2><p>${req.body[key]}</p>`
    })}
  </div>`,
  }

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      res.send("failed")
    } else {
      res.send("success")
    }
  })
}

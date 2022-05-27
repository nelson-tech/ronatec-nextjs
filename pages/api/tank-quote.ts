import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"
require("dotenv").config()

// ####
// #### Variables
// ####

const USERNAME = process.env.MAIL_USERNAME
const PASSWORD = process.env.MAIL_PASSWORD

// ####
// #### Component
// ####

const TankQuote = (req: NextApiRequest, res: NextApiResponse) => {
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

export default TankQuote

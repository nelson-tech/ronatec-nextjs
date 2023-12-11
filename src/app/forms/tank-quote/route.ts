import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// ####
// #### Variables
// ####

const USERNAME = process.env.MAIL_USERNAME
const PASSWORD = process.env.MAIL_PASSWORD

// ####
// #### Component
// ####

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()

    const smtpConfig = {
      service: "gmail",
      auth: {
        user: USERNAME ?? "",
        pass: PASSWORD ?? "",
      },
    }

    const transporter = nodemailer.createTransport(smtpConfig)

    const innerHTML = Object.keys(data).map((key) => {
      return `<h2>${key}</h2><p>${data[key]}</p>`
    })

    const mailData = {
      from: `${data["Contact - Name"]} <${data["Contact - Email"]}>`,
      to: "Website Forms <jwetherald@ronatec.us>",
      subject: "Website Quote Request",
      replyTo: data["Contact - Email"],
      html: `<div>${innerHTML}</div>`,
    }

    let status

    await transporter.sendMail(mailData, (err) => {
      if (err) {
        status = "failed"
      } else {
        status = "success"
      }
    })

    return NextResponse.json({ message: status })
  } catch (error) {
    console.warn(error)

    return NextResponse.json({ message: "error" })
  }
}

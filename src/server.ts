import dotenv from "dotenv"
import next from "next"
import nextBuild from "next/dist/build"
import path from "path"

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})

import express from "express"
import getPayloadClient from "~payload/payloadClient"

const app = express()
const PORT = process.env.PORT || 8140

const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (newPayload) => {
        newPayload.logger.info(`Payload Admin URL: ${newPayload.getAdminURL()}`)
      },
    },
  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started")

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      )
    })
  })
}

start()

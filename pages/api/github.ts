import type { NextApiHandler } from "next"

import { exec } from "child_process"
import crypto from "crypto"

// Handle GitHub Webhooks
const GitWebhook: NextApiHandler = async (req, res) => {
  const webhooksSecret = process.env.WEBHOOKS_SECRET ?? ""
  try {
    console.log("Incoming Request")
    if (req.method !== "POST") {
      res.send(404)
      return
    }
    let sig =
      "sha256=" +
      crypto
        .createHmac("sha256", webhooksSecret)
        .update(JSON.stringify(req.body))
        .digest("hex")
    if (
      req.headers["x-hub-signature-256"] === sig &&
      req.body?.ref === "refs/heads/main" &&
      process.env.REPO_PATH
    ) {
      exec(
        "cd " +
          process.env.REPO_PATH +
          " && git pull && yarn install && yarn build && yarn pm2-restart",
      )
      console.log("GitHub Webhook ran successfully")
      res.end()
      return
    }
    console.log("GitHub Webhook failed")
    res.end()
    return
  } catch (e) {
    console.log(e)
  }
}

export default GitWebhook

import type { NextApiHandler } from "next"

// import { exec } from "child_process"
// import crypto from "crypto"

require("dotenv").config()

// Handle GitHub Webhooks
const GitWebhook: NextApiHandler = async (req, res) => {
  // const webhooksSecret = process.env.WEBHOOKS_SECRET ?? ""
  // const repoBranch = process.env.REPO_BRANCH
  // const repoPath = process.env.REPO_PATH

  // try {
  //   console.log("Incoming Request")
  //   if (req.method !== "POST") {
  //     res.send(404)
  //     return
  //   }
  //   let sig =
  //     "sha256=" +
  //     crypto
  //       .createHmac("sha256", webhooksSecret)
  //       .update(JSON.stringify(req.body))
  //       .digest("hex")

  //   if (
  //     req.headers["x-hub-signature-256"] === sig &&
  //     req.body?.ref === `refs/heads/${repoBranch}` &&
  //     repoPath
  //   ) {
  //     console.log("Github Webhook running...")

  //     // exec(
  //     //   `cd ${repoPath} && \
  //     //     git pull && rm -rf .next && rm -rf node_modules && \
  //     //     yarn install && yarn build && yarn pm2-restart`,
  //     //   (error, stdout, stderr) => {
  //     //     if (error) {
  //     //       console.error(`exec error: ${error}`)
  //     //       return
  //     //     }
  //     //     console.log(`stdout: ${stdout}`)
  //     //     console.error(`stderr: ${stderr}`)
  //     //   }
  //     // )

  //     console.log("GitHub Webhook ran successfully")

  //     res.end()

  //     return
  //   }
  //   console.log("GitHub Webhook failed")

  //   res.end()

  //   return
  // } catch (e) {
  //   console.warn("Error in github webhook:", e)
  // }
  res.end()
}

export default GitWebhook

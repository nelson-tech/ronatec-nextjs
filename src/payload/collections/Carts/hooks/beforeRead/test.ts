import { BeforeReadHook } from "payload/dist/collections/config/types"

const test: BeforeReadHook = async ({
  doc, // full document data
  req, // full express request
  query, // JSON formatted query
}) => {
  console.log("Trying things here", req.user)

  return doc
}

export default test

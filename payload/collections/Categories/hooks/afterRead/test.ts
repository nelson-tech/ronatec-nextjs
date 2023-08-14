import { AfterReadHook } from "payload/dist/collections/config/types"
import { Category } from "payload/generated-types"

const test: AfterReadHook<Category> = async ({ req, doc, findMany }) => {
  if (!findMany) {
    const orphans = await req.payload.find({
      collection: "categories",
      where: { parent: { equals: doc.id } },
    })

    // const test = await req.payload.update({
    //   collection: "categories",
    //   id: doc.id,
    //   data: { parent: undefined },
    // })
    // console.log("Orphans", test)
  }
}

export default test

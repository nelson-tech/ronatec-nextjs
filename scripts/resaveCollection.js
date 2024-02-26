const payload = require("payload")

require("dotenv").config()

const resaveCollection = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGO_URL,
    local: true,
  })

  const args = process.argv.slice(2) // nodejs command line args are an array that begin at the third item
  const [collectionSlug, overrides] = args || []

  const results = await payload.find({
    collection: collectionSlug,
    depth: 0,
    limit: 700,
  })

  try {
    await Promise.all(
      results.docs.map(async (result) => {
        const { id } = result

        if (collectionSlug) {
          try {
            await payload.update({
              collection: collectionSlug,
              id,
              data: {
                ...(overrides || {}),
              },
            })

            console.log(
              `Document in '${collectionSlug}' with id '${id}' updated successfully`
            )
          } catch (e) {
            payload.logger.error(
              `Document in '${collectionSlug}' with id '${id}' failed to update`
            )
            payload.logger.error(e)
          }
        } else {
          console.log(
            `No document found in '${collectionSlug}' with id '${id}'`
          )
        }
      })
    )
  } catch (e) {
    payload.logger.error("Something went wrong.")
    payload.logger.error(e)
  }

  console.log("Complete")
  process.exit(0)
}

resaveCollection()

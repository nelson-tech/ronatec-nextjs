import type { Payload } from "payload"
import type { MediaCollectionTitles } from "./types"
import type { Where } from "payload/types"

type FindMatchingMediaArgs = {
  where: Where
  payload: Payload
  collection: MediaCollectionTitles
}

const findMatchingMedia = async ({
  payload,
  collection,
  where,
}: FindMatchingMediaArgs) => {
  const matches = await payload.find({
    collection,
    where,
  })

  return matches.docs.length > 0 ? matches.docs.at(0) : null
}

export default findMatchingMedia

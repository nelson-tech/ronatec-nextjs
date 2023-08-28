import type { Payload } from "payload"
import type { Where } from "payload/types"
import { Config } from "payload/generated-types"

type FindMatchingMediaArgs<T> = {
  where: Where
  payload: Payload
  collection: T
}

const findMatchingDocument = async <T extends keyof Config["collections"]>({
  payload,
  collection,
  where,
}: FindMatchingMediaArgs<T>): Promise<Config["collections"][T] | null> => {
  const matches = await payload.find({
    collection,
    where,
  })

  return matches.docs.length > 0 ? matches.docs.at(0) ?? null : null
}

export default findMatchingDocument

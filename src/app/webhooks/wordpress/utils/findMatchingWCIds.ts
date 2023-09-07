import type { Payload } from "payload"
import type { Where } from "payload/types"
import { Config } from "~payload-types"
import getPayloadClient from "~payload/payloadClient"

type FindMatchingMediaArgs<T> = {
  where: Where
  collection: T
}

const findMatchingWCIds = async <T extends keyof Config["collections"]>({
  collection,
  where,
}: FindMatchingMediaArgs<T>): Promise<string[] | undefined> => {
  const payload = await getPayloadClient()
  const matches = await payload.find({
    collection,
    where,
  })

  const ids =
    matches.docs.length > 0
      ? (matches.docs as Config["collections"][T][])
          .map((doc) => doc.id)
          .filter((doc) => !!doc) ?? undefined
      : undefined

  return ids
}

export default findMatchingWCIds

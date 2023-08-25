import type { Payload } from "payload"
import type { Category } from "payload/generated-types"

type FindMatchingCategoryArgs = {
  field: string
  value: any
  payload: Payload
}

const findMatchingCategory = async ({
  field,
  value,
  payload,
}: FindMatchingCategoryArgs): Promise<Category | null> => {
  const matches = await payload.find({
    collection: "categories",
    where: { [field]: { equals: value } },
  })

  return matches.docs.length > 0 ? matches.docs.at(0) ?? null : null
}

export default findMatchingCategory

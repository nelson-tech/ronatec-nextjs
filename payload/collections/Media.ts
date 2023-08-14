import type { CollectionConfig } from "payload/types"

const Media: (overrides?: Partial<CollectionConfig>) => CollectionConfig = (
  overrides
) => ({
  ...overrides,
  admin: {
    ...overrides?.admin,
    group: overrides?.admin?.group ?? "Media",
  },
  slug: overrides?.slug ?? "media",
  upload: {
    ...(typeof overrides?.upload === "object" && overrides?.upload),
  },
  access: {
    read: () => true,
    ...overrides?.access,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    ...(overrides?.fields ?? []),
  ],
})

export default Media

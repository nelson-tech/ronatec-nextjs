import { GlobalConfig } from "payload/types"
import CardsArrayField from "../../fields/cardsArray"
import { meta } from "~payload/fields/meta"

const AboutPage: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  versions: true,
  fields: [CardsArrayField, meta({})],
}

export default AboutPage

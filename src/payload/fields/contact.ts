import { Field } from "payload/types"

const contactFields: Field[] = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "company", type: "text" },
  { name: "phone", type: "text" },
  { name: "email", type: "text" },
  { name: "address1", type: "text" },
  { name: "address2", type: "text" },
  { name: "city", type: "text" },
  { name: "state", type: "text" },
  { name: "postcode", type: "text" },
  { name: "country", type: "text" },
]

export default contactFields

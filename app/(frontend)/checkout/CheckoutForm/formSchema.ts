import { string, object, discriminatedUnion, literal, union } from "zod"

const messages = {
  email: "Valid email is required.",
  phone: {
    min: "Phone number must be at least 7 characters long.",
    max: "Phone number cannot be more than 17 characters long.",
  },
  firstName: "First name is required.",
  lastName: "Last name is required.",
  address1: "Valid address is required.",
  city: "City is required.",
  state: "State is required.",
  postcode: "Postcode is required.",
  country: "Country is required.",
}

const contactSchema = object({
  email: string({
    required_error: messages.email,
    invalid_type_error: messages.email,
  }).email({
    message: messages.email,
  }),
  phone: union([
    string().min(7, messages.phone.min).max(17, messages.phone.max),
    string().length(0),
  ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  firstName: string({ invalid_type_error: messages.firstName }).min(
    1,
    messages.firstName
  ),
  lastName: string({ invalid_type_error: messages.lastName }).min(
    1,
    messages.lastName
  ),
  company: string().optional(),
  address1: string({ invalid_type_error: messages.address1 }).optional(),
  address2: string().optional(),
  city: string({ invalid_type_error: messages.city }).optional(),
  state: string({ invalid_type_error: messages.state }).optional(),
  postcode: string({ invalid_type_error: messages.postcode }).optional(),
  country: string({ invalid_type_error: messages.country }).optional(),
})

const schema = discriminatedUnion("shipToDifferentAddress", [
  object({
    shipToDifferentAddress: literal(false),
    billing: contactSchema,
    customerNote: string().nullish(),
  }),
  object({
    shipToDifferentAddress: literal(true),
    billing: contactSchema,
    shipping: contactSchema,
    customerNote: string().nullish(),
  }),
])

export default schema

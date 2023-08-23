import { string, object, discriminatedUnion, literal } from "zod"

const messages = {
  email: "Valid email is required.",
  phone: "Phone number is required (5-17 characters long).",
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
  phone: string({ invalid_type_error: messages.phone })
    // .min(5, messages.phone)
    // .max(17, messages.phone)
    .nullable(),
  firstName: string({ invalid_type_error: messages.firstName }).min(
    1,
    messages.firstName
  ),
  lastName: string({ invalid_type_error: messages.lastName }).min(
    1,
    messages.lastName
  ),
  company: string().nullable(),
  address1: string({ invalid_type_error: messages.address1 }).nullable(),
  address2: string().nullable(),
  city: string({ invalid_type_error: messages.city }).nullable(),
  state: string({ invalid_type_error: messages.state }).nullable(),
  postcode: string({ invalid_type_error: messages.postcode }).nullable(),
  country: string({ invalid_type_error: messages.country }).nullable(),
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

import { string, boolean, object, ZodIssueCode } from "zod"

const messages = {
  email: "Valid email is required.",
  phone: "Phone number is required (7-12 characters long).",
  firstName: "First name is required.",
  lastName: "Last name is required.",
  address1: "Valid address is required.",
  city: "City is required.",
  state: "State is required.",
  postcode: "Postcode is required.",
  country: "Country is required.",
}

const billingSchema = object({
  email: string().email({ message: messages.email }),
  phone: string().min(5, messages.phone).max(12, messages.phone),
  firstName: string().min(1, messages.firstName),
  lastName: string().min(1, messages.lastName),
  company: string().nullable(),
  address1: string().min(1, messages.address1),
  address2: string().nullable(),
  city: string().min(1, messages.city),
  state: string().min(2, messages.state),
  postcode: string().min(1, messages.postcode),
  country: string().min(1, messages.country),
})

const shippingSchema = object({
  shipToDifferentAddress: boolean(),
  email: string().nullish(),
  phone: string().nullish(),
  firstName: string().nullish(),
  lastName: string().nullish(),
  company: string().nullish(),
  address1: string().nullish(),
  address2: string().nullish(),
  city: string().nullish(),
  state: string().nullish(),
  postcode: string().nullish(),
  country: string().nullish(),
}).superRefine((data, ctx) => {
  if (data?.shipToDifferentAddress) {
    const shipping = data as { [key: string]: any }
    const contacts = billingSchema.shape as { [key: string]: any }
    Object.keys(data).map(entry => {
      if ((messages as { [key: string]: string })[entry]) {
        ;(!shipping[entry] ||
          shipping[entry] < (contacts[entry].minLength ?? 1)) &&
          ctx.addIssue({
            code: ZodIssueCode.custom,
            path: [entry],
            message: (messages as { [key: string]: string })[entry],
          })
      }
    })
  }
})

const schema = object({
  billing: billingSchema,
  shipping: shippingSchema,
  customerNote: string().nullish(),
})

export default schema

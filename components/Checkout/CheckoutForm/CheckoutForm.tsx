import { useState } from "react"
import { useRouter } from "next/router"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DocumentDuplicateIcon } from "@heroicons/react/solid"
// import { LockClosedIcon } from "@heroicons/react/solid"

import useCart from "@lib/hooks/useCart"
import useStore from "@lib/hooks/useStore"
import {
  CheckoutInput,
  CountriesEnum,
  Customer,
  Maybe,
  useCheckoutMutation,
} from "@api/gql/types"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import FormField from "@components/ui/FormField"

import schema from "./formSchema"

// ####
// #### Types
// ####

type PropsType = {
  customer: Customer
}

type ContactInformationType = {
  address1: Maybe<string>
  address2: Maybe<string>
  city: Maybe<string>
  company: Maybe<string>
  country: Maybe<CountriesEnum>
  postcode: Maybe<string>
  phone: Maybe<string>
  email: Maybe<string>
  state: Maybe<string>
  firstName: Maybe<string>
  lastName: Maybe<string>
}

type FormDataType = {
  billing: ContactInformationType
  shipping: ContactInformationType
  shipToDifferentAddress: boolean
}

// ####
// #### Component
// ####

const CheckoutForm = ({ customer }: PropsType) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { clearCart } = useCart()

  const setAlert = useStore(state => state.alert.setAlert)

  const [_, checkoutMutation] = useCheckoutMutation()

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    control,
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      billing: {
        address1: customer?.billing?.address1,
        address2: customer?.billing?.address2,
        city: customer?.billing?.city,
        company: customer?.billing?.company,
        country: customer?.billing?.country,
        postcode: customer?.billing?.postcode,
        phone: customer?.billing?.phone,
        email: customer?.billing?.email,
        state: customer?.billing?.state,
        firstName: customer?.billing?.firstName,
        lastName: customer?.billing?.lastName,
      },
      shipToDifferentAddress: false,
      shipping: {
        address1: customer?.shipping?.address1,
        address2: customer?.shipping?.address2,
        city: customer?.shipping?.city,
        company: customer?.shipping?.company,
        country: customer?.shipping?.country,
        postcode: customer?.shipping?.postcode,
        phone: customer?.shipping?.phone,
        email: customer?.shipping?.email,
        state: customer?.shipping?.state,
        firstName: customer?.shipping?.firstName,
        lastName: customer?.shipping?.lastName,
      },
    },
  })

  const shippingDifferent = useWatch({
    control,
    name: "shipToDifferentAddress",
  })

  const onSubmit: SubmitHandler<FormDataType> = async formData => {
    setLoading(true)

    // Exclude shipping unless billing and shipping should be different
    const { shipping, shipToDifferentAddress, ...baseData } = formData

    const input: CheckoutInput = shipToDifferentAddress
      ? {
          ...baseData,
          shipToDifferentAddress,
          shipping: { ...shipping, overwrite: true },
        }
      : { ...baseData, shipToDifferentAddress }

    // Set paymentMethod to cash-on-delivery as no payments will be collected
    input.paymentMethod = "cod"
    input.isPaid = false

    const { data, error } = await checkoutMutation({ input })

    data?.checkout?.order &&
      clearCart().then(r => {
        data?.checkout?.order &&
          router.push(
            {
              pathname: "/thanks",
              query: { orderData: JSON.stringify(data.checkout.order) },
            },
            `/thanks${
              data.checkout.order.orderNumber
                ? `?order=${data.checkout.order.orderNumber}`
                : ""
            }`,
          )
      })

    error &&
      setAlert({
        open: true,
        type: "error",
        primary: "Error Checking Out",
        secondary: error.message.split("] ")[1],
      })

    error && console.warn(error)

    setLoading(false)
  }

  const billingValues = useWatch({ control, name: "billing" })

  const handleCopyBilling = () => {
    setValue("shipping", billingValues)
  }

  return (
    <>
      <section
        aria-labelledby="payment-heading"
        className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-16"
      >
        <h2 id="payment-heading" className="sr-only">
          Payment and shipping details
        </h2>

        <div className="max-w-2xl mx-auto lg:pt-16">
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-y-6 gap-x-4">
              <h2 className="col-span-full text-xl font-semibold">
                Billing Details
              </h2>
              <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
                <FormField
                  register={register}
                  errors={errors}
                  name="billing.email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  containerStyle="w-auto"
                />
                <FormField
                  register={register}
                  errors={errors}
                  name="billing.phone"
                  label="Phone Number"
                  type="text"
                  autoComplete="tel"
                  containerStyle="w-auto"
                />
              </div>

              <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
                <FormField
                  register={register}
                  errors={errors}
                  name="billing.firstName"
                  label="First Name"
                  type="text"
                  autoComplete="cc-given-name"
                  containerStyle="w-auto"
                />
                <FormField
                  register={register}
                  errors={errors}
                  name="billing.lastName"
                  label="Last Name"
                  type="text"
                  autoComplete="cc-family-name"
                  containerStyle="w-auto"
                />
              </div>

              <FormField
                register={register}
                errors={errors}
                name="billing.company"
                label="Company"
                type="text"
                autoComplete="organization"
              />

              <FormField
                register={register}
                errors={errors}
                name="billing.address1"
                label="Address"
                type="text"
                autoComplete="address-line1"
              />

              <FormField
                register={register}
                errors={errors}
                name="billing.address2"
                label={
                  <>
                    Address <span className="text-gray-400">(Continued)</span>
                  </>
                }
                type="text"
                autoComplete="address-line2"
              />

              <FormField
                register={register}
                errors={errors}
                name="billing.city"
                label="City"
                type="text"
                autoComplete="address-level2"
                containerStyle="col-span-7 md:col-span-5"
              />

              <FormField
                register={register}
                errors={errors}
                name="billing.state"
                label="State / Province"
                type="text"
                autoComplete="address-level1"
                containerStyle="col-span-5 md:col-span-3"
              />

              <FormField
                register={register}
                errors={errors}
                name="billing.postcode"
                label="Postal Code"
                type="text"
                autoComplete="postal-code"
                containerStyle="col-span-full md:col-span-4"
              />
            </div>

            <div className="mt-6 flex space-x-2">
              <FormField
                register={register}
                errors={errors}
                name="shipToDifferentAddress"
                label="Ship to a different address than billing address"
                labelAfter
                type="checkbox"
                containerStyle="flex items-center h-5"
                labelStyle="text-sm font-medium text-gray-900"
                inputStyle="mr-2 h-4 w-4 border-gray-300 border-b p-2 rounded text-blue-main outline-none focus:ring-blue-main"
              />
            </div>
            <FormField
              register={register}
              errors={errors}
              name="customerNote"
              label="Note"
              type="text-area"
              autoComplete="postal-code"
              containerStyle="col-span-full md:col-span-4 mt-4"
              textArea
            />

            {shippingDifferent && (
              <>
                <div className="grid grid-cols-12 mt-6 mb-4 border-t border-gray-300 pt-4 gap-y-6 gap-x-4">
                  <div className="col-span-full flex items-center">
                    <h2 className="text-xl font-semibold">Shipping Details</h2>
                    <div
                      className="ml-4 flex text-gray-400 cursor-pointer text-sm items-center"
                      onClick={handleCopyBilling}
                    >
                      <DocumentDuplicateIcon className="h-4 w-4 text-green-main" />
                      Copy from billing
                    </div>
                  </div>
                  <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
                    <FormField
                      register={register}
                      errors={errors}
                      name="shipping.email"
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      containerStyle="w-auto"
                    />
                    <FormField
                      register={register}
                      errors={errors}
                      name="shipping.phone"
                      label="Phone Number"
                      type="text"
                      autoComplete="tel"
                      containerStyle="w-auto"
                    />
                  </div>

                  <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
                    <FormField
                      register={register}
                      registerOptions={{ required: "First name is required." }}
                      errors={errors}
                      name="shipping.firstName"
                      label="First Name"
                      type="text"
                      autoComplete="given-name"
                      containerStyle="w-auto"
                    />
                    <FormField
                      register={register}
                      errors={errors}
                      name="shipping.lastName"
                      label="Last Name"
                      type="text"
                      autoComplete="family-name"
                      containerStyle="w-auto"
                    />
                  </div>

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.company"
                    label="Company"
                    type="text"
                    autoComplete="organization"
                  />

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.address1"
                    label="Address"
                    type="text"
                    autoComplete="street-address"
                  />

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.address2"
                    label={
                      <>
                        Address{" "}
                        <span className="text-gray-400">(Continued)</span>
                      </>
                    }
                    type="text"
                    autoComplete="street-address"
                  />

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.city"
                    label="City"
                    type="text"
                    autoComplete="address-level2"
                    containerStyle="col-span-7 md:col-span-5"
                  />

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.state"
                    label="State / Province"
                    type="text"
                    autoComplete="address-level1"
                    containerStyle="col-span-5 md:col-span-3"
                  />

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.postcode"
                    label="Postal Code"
                    type="text"
                    autoComplete="postal-code"
                    containerStyle="col-span-full md:col-span-4"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-main border border-transparent rounded-md shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-blue-main"
            >
              {loading ? (
                <LoadingSpinner size={7} color="white" className="mx-auto" />
              ) : (
                "Place Order"
              )}
            </button>

            {/* <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
              <LockClosedIcon
                className="w-5 h-5 text-gray-400 mr-1.5"
                aria-hidden="true"
              />
              Payment details stored in plain text
            </p> */}
          </form>
        </div>
      </section>
    </>
  )
}

export default CheckoutForm

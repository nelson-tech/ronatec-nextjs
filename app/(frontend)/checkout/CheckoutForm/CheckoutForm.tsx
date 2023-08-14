import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import DocumentDuplicateIcon from "@heroicons/react/20/solid/DocumentDuplicateIcon"
// import { LockClosedIcon } from "@heroicons/react/solid"

import useStore from "@hooks/useStore"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import FormField from "@components/ui/FormField"

import schema from "./formSchema"
import useCart from "@hooks/useCart"
import { Order } from "payload/generated-types"

type ContactInformationType = {
  address1: string
  address2: string
  city: string
  company: string
  country: any
  postcode: string
  phone: string
  email: string
  state: string
  firstName: string
  lastName: string
}

type FormDataType = {
  billing: ContactInformationType
  shipping: ContactInformationType
  shipToDifferentAddress: boolean
}

// ####
// #### Component
// ####

const CheckoutForm = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { user, setAlert } = useStore((state) => ({
    user: state.auth.user,
    setAlert: state.alert.setAlert,
  }))

  const { clearCart } = useCart()

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
        address1: user?.billing?.address1,
        address2: user?.billing?.address2,
        city: user?.billing?.city,
        company: user?.billing?.company,
        country: user?.billing?.country,
        postcode: user?.billing?.postcode,
        phone: user?.billing?.phone,
        email: user?.billing?.email,
        state: user?.billing?.state,
        firstName: user?.billing?.firstName,
        lastName: user?.billing?.lastName,
      },
      shipToDifferentAddress: false,
      shipping: {
        address1: user?.shipping?.address1,
        address2: user?.shipping?.address2,
        city: user?.shipping?.city,
        company: user?.shipping?.company,
        country: user?.shipping?.country,
        postcode: user?.shipping?.postcode,
        phone: user?.shipping?.phone,
        email: user?.shipping?.email,
        state: user?.shipping?.state,
        firstName: user?.shipping?.firstName,
        lastName: user?.shipping?.lastName,
      },
    },
  })

  const shippingDifferent = useWatch({
    control,
    name: "shipToDifferentAddress",
  })

  const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
    setLoading(true)

    // Exclude shipping unless billing and shipping should be different
    const { shipping, shipToDifferentAddress, ...baseData } = formData

    const input: Partial<Order> = shipToDifferentAddress
      ? {
          ...baseData,
          shipToDifferentAddress,
          shipping: { ...shipping },
        }
      : { ...baseData, shipToDifferentAddress }

    try {
      setAlert({
        open: true,
        kind: "info",
        primary: "Processing order.",
      })

      // const checkoutData = await client.request(CheckoutDocument, { input })

      // if (checkoutData?.checkout?.order) {
      //   setAlert({
      //     open: true,
      //     kind: "success",
      //     primary: "Order has been successfully created.",
      //     secondary: "Redirecting...",
      //   })

      //   router.push(
      //     `/thanks${
      //       checkoutData.checkout.order.orderNumber
      //         ? `?order=${checkoutData.checkout.order.orderNumber}`
      //         : ""
      //     }`
      //   )

      //   clearCart()
      // } else {
      //   setAlert({
      //     open: true,
      //     kind: "error",
      //     primary: "Error Checking Out",
      //   })
      // }
    } catch (error) {
      console.warn("Error in CheckoutForm:", error)
      setAlert({ open: true, kind: "error", primary: "Error checking out." })
    }

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
        className="flex-auto overflow-y-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-4 lg:px-8 lg:pt-0 lg:pb-16"
      >
        <h2 id="payment-heading" className="sr-only">
          Payment and shipping details
        </h2>

        <div className="max-w-2xl mx-auto">
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

              <FormField
                register={register}
                errors={errors}
                name="billing.country"
                label="Country"
                type="select"
                select
                // options={Object.values(any)}
                defaultValue={user?.billing?.country}
                autoComplete="country-name"
                containerStyle="col-span-full"
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
              name="userNote"
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
                      <DocumentDuplicateIcon className="h-4 w-4 text-highlight" />
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

                  <FormField
                    register={register}
                    errors={errors}
                    name="shipping.country"
                    label="Country"
                    type="select"
                    select
                    // options={Object.values(any)}
                    defaultValue={user?.billing?.country}
                    autoComplete="country-name"
                    containerStyle="col-span-full"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-main border border-transparent rounded shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-blue-main"
            >
              {loading ? (
                <LoadingSpinner size={7} color="white" className="mx-auto" />
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default CheckoutForm

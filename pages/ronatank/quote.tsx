import { useState } from "react"
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
  useWatch,
} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import RefreshIcon from "@heroicons/react/outline/RefreshIcon"

import PageTitle from "@components/PageTitle"

const Quote = ({}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formStatus, setFormStatus] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const ErrorField = ({ name }: { name: string }) => (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="text-red-main text-sm pt-2">{message}</p>
      )}
    />
  )

  type RadioInputType = {
    name: string
    value: string
  }

  type RadioInputPropsType = {
    input: RadioInputType
    field: ControllerRenderProps<FieldValues, any>
  }

  const RadioInput = ({ input, field }: RadioInputPropsType) => {
    return (
      <div className="flex items-center">
        <input
          value={input.value}
          checked={field.value === input.value}
          type="radio"
          onChange={e => field.onChange(e.target.value)}
          className="focus:ring-blue-main h-5 w-5 text-blue-dark border-gray-300"
        />
        <label className="ml-3 block text-sm font-medium text-gray-700">
          {input.name}
        </label>
      </div>
    )
  }

  type RadioControllerPropsType = {
    name: string
    description: string
    inputs: RadioInputType[]
    required?: string | boolean
  }

  const RadioController = (props: RadioControllerPropsType) => {
    return (
      <Controller
        render={({ field }) => (
          <fieldset aria-label={props.name} {...field}>
            <div>
              <legend className="text-base font-medium text-gray-900">
                {props.name}
              </legend>
              <p className="mt-1 text-sm text-gray-500">{props.description}</p>
              <ErrorField name={props.name} />
            </div>
            <div className="mt-4 space-y-4">
              {props.inputs.map(input => (
                <RadioInput
                  field={field}
                  input={input}
                  key={props.name + input.name + input.value}
                />
              ))}
            </div>
          </fieldset>
        )}
        name={props.name}
        rules={{
          required: props.required ? `${props.name} is required.` : false,
        }}
        control={control}
      />
    )
  }

  const tankLegs = useWatch({ name: "Tank Legs", control })
  const heater = useWatch({ name: "Heater", control })
  const agitation = useWatch({ name: "Tank Agitation", control })

  return (
    <>
      <PageTitle
        title="Tank Quote"
        description="Contact us for a customized tank quote."
        banner={false}
      />

      <div className="px-5 mx-auto max-w-7xl my-8">
        <div>
          <h2 className="text-2xl font-extrabold pb-6 px-5">Request A Quote</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form
                  onSubmit={handleSubmit(data => {
                    setLoading(true)
                    fetch("/api/tank-quote", {
                      method: "POST",
                      headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }).then(res => {
                      if (res.status === 200) {
                        setFormStatus("Quote request sent.")
                      } else {
                        setFormStatus("Error sending quote request.")
                      }

                      setLoading(false)
                    })
                  })}
                  className="space-y-6"
                  action="#"
                  method="POST"
                >
                  <div className="">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="pb-8">
                        <RadioController
                          name="Tank Wall Thickness"
                          description="Please specify the thickness of Natural Poly Pro for your tank."
                          inputs={[
                            { name: `0.5"`, value: "0.5in" },
                            { name: `0.75"`, value: "0.75in" },
                          ]}
                          required
                        />
                      </div>

                      <div className="pb-8">
                        <label
                          htmlFor="Tank Dimensions"
                          className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                        >
                          Tank Dimensions
                        </label>
                        <div className="mt-1">
                          <span className="text-sm text-gray-500">
                            Please input your tank dimensions in inches as
                            length x width x height.
                          </span>
                          <input
                            {...register("Tank Dimensions", {
                              required: "Tank Dimensions are required.",
                            })}
                            type="text"
                            className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                            placeholder="24x24x24"
                          />
                          <ErrorField name="Tank Dimensions" />
                        </div>
                      </div>

                      <div className="pb-8">
                        <RadioController
                          name="Tank Lip"
                          description="Please choose your required tank lip size."
                          inputs={[
                            { name: `3"`, value: "3in" },
                            { name: `4"`, value: "4in" },
                            { name: `6"`, value: "6in" },
                          ]}
                          required
                        />
                      </div>

                      <div className="pb-8">
                        <RadioController
                          name="Tank Legs"
                          description="Will your tank need legs or will it sit on the ground?"
                          inputs={[
                            { name: "Yes, Tank Legs", value: "yes" },
                            { name: "No, Tank Sits On Ground", value: "no" },
                          ]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {tankLegs === "yes" && (
                    <div className="pb-8">
                      <label
                        htmlFor="Tank Legs Height"
                        className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                      >
                        Tank Legs Height
                      </label>
                      <div className="mt-1">
                        <span className="text-sm text-gray-500">
                          How tall will your tank legs need to be (in inches)?
                        </span>
                        <input
                          {...register("Tank Legs Height", {
                            required: "Tank Legs Height is required.",
                          })}
                          type="text"
                          className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                          placeholder="24x24x24"
                        />
                        <ErrorField name="Tank Legs Height" />
                      </div>
                    </div>
                  )}

                  <div className="pb-8">
                    <RadioController
                      name="Electrical"
                      description="Please select the proper voltage for your tank."
                      inputs={[
                        { name: "240V", value: "240V" },
                        { name: "480V", value: "480V" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="AC Distribution"
                      description="Please select either single-phase or three-phase electrical for your tank."
                      inputs={[
                        { name: "Single-Phase", value: "single-phase" },
                        { name: "Three-Phase", value: "three-phase" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="Girths"
                      description="Please select the appropriate girths for your tank."
                      inputs={[
                        { name: "Steel Girths", value: "steel" },
                        { name: "Poly Pro Girths", value: "poly-pro" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="Heater"
                      description="Please select a heater option for your tank."
                      inputs={[
                        { name: "Electric", value: "electric" },
                        {
                          name: "External Heat Exchanger",
                          value: "external-heat-exchanger",
                        },
                      ]}
                      required
                    />
                  </div>

                  {heater === "electric" && (
                    <div className="pb-8">
                      <RadioController
                        name="Electric Heater Material"
                        description="Please select the material for your electric heater."
                        inputs={[
                          { name: "Teflon", value: "teflon" },
                          { name: "Stainless Steel", value: "stainless-steel" },
                          { name: "Titanium", value: "titanium" },
                        ]}
                        required
                      />
                    </div>
                  )}

                  {heater === "external-heat-exchanger" && (
                    <>
                      <div className="pb-8">
                        <RadioController
                          name="External Heat Exchanger"
                          description="Will the boiler of your external heat exchanger be running steam or hot water?"
                          inputs={[
                            { name: "Steam", value: "steam" },
                            { name: "Hot Water", value: "hot-water" },
                          ]}
                          required
                        />
                      </div>

                      <div className="pb-8">
                        <label
                          htmlFor="Tank Temperature"
                          className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                        >
                          Tank Temperature
                        </label>
                        <div className="mt-1">
                          <span className="text-sm text-gray-500">
                            What is the temperature at the point where your tank
                            will be?
                          </span>
                          <input
                            {...register("Tank Temperature", {
                              required: "Tank Temperature is required.",
                            })}
                            type="text"
                            className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                            placeholder="28C | 82F"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pb-8">
                    <RadioController
                      name="Electroless Nickel Feed Controller"
                      description="Would you like an electroless nickel feed controller for your tank?"
                      inputs={[
                        { name: "Yes", value: "yes" },
                        { name: "No", value: "no" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="Tank Agitation"
                      description=""
                      inputs={[
                        { name: "Solution", value: "solution" },
                        { name: "Air", value: "air" },
                        { name: "Work Rod", value: "work-rod" },
                      ]}
                      required
                    />
                  </div>

                  {agitation === "work-rod" && (
                    <div className="pb-8">
                      <label
                        htmlFor="Work Rod Agitation"
                        className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                      >
                        Work Rod Agitation
                      </label>
                      <div className="mt-1">
                        <span className="text-sm text-gray-500">
                          Please enter the maximum weight to be used.
                        </span>
                        <input
                          {...register("Work Rod Agitation")}
                          type="text"
                          className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                          placeholder=""
                        />
                      </div>
                    </div>
                  )}

                  <div className="pb-8">
                    <RadioController
                      name="Tank Pump"
                      description="Would you like your tank pump to be mounted inside or outside of your tank?"
                      inputs={[
                        { name: "Inside", value: "inside" },
                        { name: "Outside", value: "outside" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="Ventilation"
                      description=""
                      inputs={[
                        { name: "Yes", value: "yes" },
                        { name: "No", value: "no" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <RadioController
                      name="Tank Filter"
                      description="Will your tank use a filter bag or filter chamber?"
                      inputs={[
                        { name: "Filter Bag", value: "filter-bag" },
                        { name: "Filter Chamber", value: "filter-chamber" },
                      ]}
                      required
                    />
                  </div>

                  <div className="pb-8">
                    <label
                      htmlFor="Other Remarks"
                      className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                    >
                      Any other questions or tank specifications?
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...register("Other Remarks")}
                        rows={5}
                        className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="border-t pb-8" />

                  <div className="pb-8">
                    <label
                      htmlFor="Contact Name"
                      className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("Contact - Name", {
                          required: "Valid name is required.",
                        })}
                        className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                        placeholder="John Smith"
                      />
                      <ErrorField name="Contact - Name" />
                    </div>
                  </div>

                  <div className="pb-8">
                    <label
                      htmlFor="Contact Phone"
                      className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("Contact - Phone", {
                          required: "Phone number is required.",
                        })}
                        className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                        placeholder="619-555-1234"
                      />
                      <ErrorField name="Contact - Phone" />
                    </div>
                  </div>

                  <div className="pb-8">
                    <label
                      htmlFor="Email"
                      className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("Contact - Email", {
                          required: "Valid email is required.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="focus:ring-blue-main focus:border-blue-main flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
                        placeholder="jsmith@ronatec.us"
                      />
                      <ErrorField name="Contact - Email" />
                    </div>
                  </div>

                  <div className="flex justify-end items-center">
                    {loading && (
                      <div className="flip">
                        <RefreshIcon className="text-green-main w-6 animate-reverse-spin mr-4" />
                      </div>
                    )}
                    <input
                      type="reset"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-blue-main"
                    />
                    <input
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-dark hover:bg-green-main cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
                    />
                  </div>
                  {formStatus && (
                    <div className="flex justify-end items-center">
                      <div className="text-sm text-gray-400">{formStatus}</div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Quote

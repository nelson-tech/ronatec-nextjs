"use client"

import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import LoadingSpinner from "@components/ui/LoadingSpinner"

const UsedEquipmentForm = () => {
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

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true)
        const url = process.env.NEXT_PUBLIC_SERVER_URL + "/forms/used-equipment"
        console.log("Sending it out", url)

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (res) => {
            if (res.status === 200) {
              setFormStatus("Used Equipment request sent.")
            } else {
              setFormStatus("Error sending used equipment request.")
            }

            console.log("Got some used stuff")

            return res
          })
          .catch((err) => {
            console.warn("Error sending used equipment request.", err)
            setFormStatus("Error sending used equipment request.")
          })
        console.log("Sent it out", response && (await response.text()))
        setLoading(false)
      })}
      className="space-y-6"
      action="#"
      method="POST"
    >
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
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
            placeholder="John Smith"
          />
          <ErrorField name="Contact - Name" />
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
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
            placeholder="jsmith@ronatec.us"
          />
          <ErrorField name="Contact - Email" />
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
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
            placeholder="619-555-1234"
          />
          <ErrorField name="Contact - Phone" />
        </div>
      </div>

      <div className="pb-8">
        <label
          htmlFor="Location"
          className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
        >
          Location
        </label>
        <div className="mt-1">
          <input
            {...register("Location")}
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
          />
          <ErrorField name="Location" />
        </div>
      </div>

      <div className="pb-8">
        <label
          htmlFor="Contact Company"
          className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            {...register("Contact - Company", {
              required: "Company is required.",
            })}
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
          />
          <ErrorField name="Contact - Company" />
        </div>
      </div>

      <div className="border-t pb-8" />

      <div className="pb-8">
        <label
          htmlFor="Message"
          className="block text-base border-gray-300 ring-gray-100 font-medium text-gray-700"
        >
          Message
        </label>
        <div className="mt-1">
          <textarea
            {...register("Message")}
            rows={5}
            className="focus:ring-accent focus:border-accent flex-1 block w-full rounded py-1 px-2 border sm:text-sm border-gray-300"
            placeholder=""
          />
        </div>
      </div>

      <div className="flex justify-end items-center pb-4">
        {loading && (
          <>
            <LoadingSpinner
              size={6}
              color="#37b679"
              opacity={100}
              className="mr-4"
            />
          </>
        )}
        <input
          type="reset"
          className="bg-white py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-accent"
        />
        <input
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-blue-dark hover:bg-highlight cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        />
      </div>
      {formStatus && (
        <div className="flex justify-end items-center">
          <div className="text-sm text-gray-400">{formStatus}</div>
        </div>
      )}
    </form>
  )
}

export default UsedEquipmentForm

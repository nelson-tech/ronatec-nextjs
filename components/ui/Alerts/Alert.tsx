import styled from "@emotion/styled"
import tw from "twin.macro"
import CheckCircleIcon from "@heroicons/react/solid/CheckCircleIcon"
import ExclamationIcon from "@heroicons/react/solid/ExclamationIcon"
import ExclamationCircleIcon from "@heroicons/react/solid/ExclamationCircleIcon"
import InformationCircleIcon from "@heroicons/react/solid/InformationCircleIcon"
import XIcon from "@heroicons/react/outline/XIcon"

import { AlertProps } from "@lib/types"

const iconSize = "h-5 w-5"

const Container = styled.div<{
  type: "info" | "warning" | "error" | "success"
}>`
  ${props =>
    props.type === "info" || props.type === "success"
      ? tw`bg-green-50 border-green-main text-green-600`
      : props.type === "error"
      ? tw`bg-red-100 border-red-main text-red-main`
      : props.type === "warning"
      ? tw`bg-yellow-100 border-yellow-600 text-yellow-800`
      : ""}
`

const Alert = (props: AlertProps) => {
  const { type, icon, primary, secondary, onClose } = props

  return (
    <Container
      type={type || "error"}
      className={`relative font-family border-t-4 rounded px-4 py-3 shadow-md my-2`}
      role="alert"
    >
      <div className="absolute top-0 right-0 p-2">
        <div
          className="cursor-pointer transition hover:text-gray-900"
          title="Close"
          onClick={() => onClose && onClose()}
        >
          <XIcon className={iconSize} />
        </div>
      </div>
      <div className="flex items-center pr-8">
        <div className="p-2 pr-4">{icon}</div>
        <div>
          <p className="font-bold">{primary}</p>
          <p className="text-sm">{secondary}</p>
        </div>
      </div>
    </Container>
  )
}

export const InfoAlert = (props: AlertProps) => {
  return (
    <Alert
      {...props}
      type="info"
      icon={<InformationCircleIcon className={iconSize} />}
    />
  )
}
export const SuccessAlert = (props: AlertProps) => {
  return (
    <Alert
      {...props}
      type="success"
      icon={<CheckCircleIcon className={iconSize} />}
    />
  )
}
export const ErrorAlert = (props: AlertProps) => {
  return (
    <Alert
      {...props}
      type="error"
      icon={<ExclamationCircleIcon className={iconSize} />}
    />
  )
}
export const WarningAlert = (props: AlertProps) => {
  return (
    <Alert
      {...props}
      type="warning"
      icon={<ExclamationIcon className={iconSize} />}
    />
  )
}

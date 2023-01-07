import styled from "@emotion/styled"
import tw from "twin.macro"
import CheckCircleIcon from "@heroicons/react/20/solid/CheckCircleIcon"
import ExclamationIcon from "@heroicons/react/20/solid/ExclamationCircleIcon"
import ExclamationCircleIcon from "@heroicons/react/20/solid/ExclamationCircleIcon"
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon"
import XIcon from "@heroicons/react/24/outline/XCircleIcon"

import { AlertProps } from "@lib/types/alerts"

// ####
// #### Styling
// ####

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

// ####
// #### Component
// ####

const Alert = (props: AlertProps) => {
  const { type, icon, primary, secondary, onClose } = props

  return (
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className={iconSize} aria-hidden="true">
            {icon}
          </div>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold">{primary}</p>
          <p className="mt-1 text-sm text-gray-500">{secondary}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <div
            className="cursor-pointer transition hover:text-gray-900"
            title="Close"
            onClick={() => onClose && onClose()}
          >
            <XIcon className={iconSize} />
          </div>
        </div>
      </div>
      {/* <div className="absolute top-0 right-0 p-2">
        
      </div>
      <div className="flex items-center pr-8">
        <div className="p-2 pr-4">{icon}</div>
        <div>
          <p className="font-bold">{primary}</p>
          <p className="text-sm">{secondary}</p>
        </div>
      </div> */}
    </div>
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

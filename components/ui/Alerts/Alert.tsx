// ####
// #### Styling
// ####

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"

const iconSize = "h-5 w-5"

// ####
// #### Component
// ####

const Alert = (props: Partial<AlertState>) => {
  const { icon, primary, secondary, onClose } = props

  return (
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className={iconSize} aria-hidden="true">
            {icon}
          </div>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <h3 className="text-sm font-medium">{primary}</h3>
          <p className="mt-1 text-sm text-gray-400">{secondary}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <div
            className="cursor-pointer transition hover:text-gray-900"
            title="Close"
            onClick={() => onClose && onClose()}
          >
            <XCircleIcon className={iconSize} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const InfoAlert = (props: Partial<AlertState>) => {
  return (
    <Alert
      {...props}
      kind="info"
      icon={props.icon ?? <InformationCircleIcon className={iconSize} />}
    />
  )
}
export const SuccessAlert = (props: Partial<AlertState>) => {
  return (
    <Alert
      {...props}
      kind="success"
      icon={props.icon ?? <CheckCircleIcon className={iconSize} />}
    />
  )
}
export const ErrorAlert = (props: Partial<AlertState>) => {
  return (
    <Alert
      {...props}
      kind="error"
      icon={props.icon ?? <ExclamationCircleIcon className={iconSize} />}
    />
  )
}
export const WarningAlert = (props: Partial<AlertState>) => {
  return (
    <Alert
      {...props}
      kind="warning"
      icon={props.icon ?? <ExclamationCircleIcon className={iconSize} />}
    />
  )
}

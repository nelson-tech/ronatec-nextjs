import { Transition } from "@headlessui/react"

import { useAlert } from "@lib/hooks"

import { ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from "./Alert"

const Alerts = () => {
  const { alert, showAlert } = useAlert()
  const onClose = () => {
    showAlert({ open: false })
  }

  return (
    <Transition
      show={alert.open}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-500"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="fixed right-0 top-0 pr-8 w-fit z-50"
    >
      {alert.type === "info" && (
        <InfoAlert
          primary={alert.primary}
          secondary={alert.secondary}
          type={alert.type}
          onClose={() => onClose()}
        />
      )}
      {alert.type === "success" && (
        <SuccessAlert
          primary={alert.primary}
          secondary={alert.secondary}
          type={alert.type}
          onClose={() => onClose()}
        />
      )}
      {alert.type === "error" && (
        <ErrorAlert
          primary={alert.primary}
          secondary={alert.secondary}
          type={alert.type}
          onClose={() => onClose()}
        />
      )}
      {alert.type === "warning" && (
        <WarningAlert
          primary={alert.primary}
          secondary={alert.secondary}
          type={alert.type}
          onClose={() => onClose()}
        />
      )}
    </Transition>
  )
}

export default Alerts

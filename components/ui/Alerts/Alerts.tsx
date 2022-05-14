import { Fragment, useEffect } from "react"
import { Transition } from "@headlessui/react"

import useStore from "@lib/hooks/useStore"

import { ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from "./Alert"

import { StyledContainer } from "./style"

// ####
// #### Component
// ####

const Alerts = () => {
  const { setAlert, ...alert } = useStore(state => state.alert)

  const onClose = () => {
    setAlert({ open: false })
  }

  useEffect(() => {
    if (alert.open) {
      setTimeout(() => {
        setAlert({ open: false })
      }, alert.timeout)
    }
  })

  return (
    <div
      aria-live="assertive"
      className="fixed z-50 inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={alert.open}
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-500"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          // className="fixed right-0 top-0 pr-8 w-fit z-50"
        >
          <StyledContainer
            type={alert.type || "error"}
            className={`relative border-t-4 my-2 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
            role="alert"
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
          </StyledContainer>
        </Transition>
      </div>
    </div>
  )
}

export default Alerts

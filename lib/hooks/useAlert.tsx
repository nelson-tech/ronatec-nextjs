import { useReactiveVar } from "@apollo/client"

import { alertVar } from "@lib/apollo/cache"
import { AlertProps } from "@lib/types"

const useAlert = () => {
  const alert = useReactiveVar(alertVar)

  const showAlert = (props: AlertProps) => {
    const currentAlert = alertVar()
    const alert = { ...currentAlert, ...props }

    alertVar(alert)

    if (alert.open && alert.timeout) {
      setTimeout(() => {
        showAlert({ open: false })
      }, alert.timeout)
    }
  }

  return { alert, showAlert }
}

export default useAlert

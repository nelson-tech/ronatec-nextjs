type AlertType = "info" | "warning" | "error" | "success"

type AlertState = {
  open: boolean

  kind?: "info" | "warning" | "error" | "success"
  icon?: React.ReactNode
  primary?: string
  secondary?: string
  onClose?: Function
  timeout?: number
}

// type AlertProps = {
//   type?: AlertType
//   icon?: React.ReactNode
//   primary?: string
//   secondary?: string
//   onClose?: Function
//   open?: boolean
// }

// type AlertType = "info" | "warning" | "error" | "success"

// export interface AlertProps {
//   type?: AlertType
//   icon?: React.ReactNode
//   primary?: string
//   secondary?: string
//   onClose?: Function
//   open?: boolean
// }

// export interface AlertState {
//   open: boolean
//   primary: string
//   secondary: string
//   type: AlertType
//   timeout: number
// }

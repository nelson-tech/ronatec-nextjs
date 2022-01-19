type AlertType = "info" | "warning" | "error" | "success"

export interface AlertProps {
  type?: AlertType
  icon?: React.ReactNode
  primary?: string
  secondary?: string
  onClose?: Function
  open?: boolean
}

export interface AlertState {
  open: boolean
  primary: string
  secondary: string
  type: AlertType
  timeout: number
}

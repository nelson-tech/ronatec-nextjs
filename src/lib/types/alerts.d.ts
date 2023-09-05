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

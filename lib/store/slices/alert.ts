import { StateCreator } from "zustand"

export type AlertSliceType = typeof initialState & {
  alert: {
    setAlert: (newAlert: AlertState | null) => void
  }
}

export const initialState = {
  alert: {
    open: false,
    primary: "",
    secondary: "",
    kind: "success" as "info" | "warning" | "error" | "success",
    timeout: 2000,
  },
}

const createAlertSlice: StateCreator<AlertSliceType, [], []> = set => ({
  alert: {
    ...initialState.alert,
    setAlert: newAlert => {
      return set(state => ({ alert: { ...state.alert, ...newAlert } }))
    },
  },
})

export default createAlertSlice

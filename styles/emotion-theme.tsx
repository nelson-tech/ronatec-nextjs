import "@emotion/react"

declare module "@emotion/react" {
  export interface Theme {
    font: string
    colors: {
      primary: string
      secondary: string
      electric: string
      ribbon: string
      text: {
        primary: string
        secondary: string
      }
      "primary-2": string
      "secondary-2": string
      hover: string
      "hover-1": string
      "hover-2": string
      "accents-1": string
      "accents-2": string
      "accents-3": string
      "accents-4": string
      "accents-5": string
      "accents-6": string
      "accents-7": string
      "accents-8": string
      "accents-9": string
      "accents-0": string
      violet: {
        main: string
        light: string
      }
      pink: string
      cyan: string
      blue: { dark: string; main: string; light: string }
      green: string
      red: string
      selection: string
    }
  }
}

export const emotionTheme = {
  font: `-apple-system, system-ui, BlinkMacSystemFont, "Helvetica Neue",
     "Helvetica", sans-serif;`,
  colors: {
    electric: "#db00ff",
    ribbon: "#0047ff",
    primary: "#ffffff",
    secondary: "#000000",
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    "primary-2": "#f1f3f5",
    "secondary-2": "#111",
    hover: "rgba(0, 0, 0, 0.075)",
    "hover-1": "rgba(0, 0, 0, 0.15)",
    "hover-2": "rgba(0, 0, 0, 0.25)",
    "accents-0": "#f8f9fa",
    "accents-1": "#f1f3f5",
    "accents-2": "#e9ecef",
    "accents-3": "#dee2e6",
    "accents-4": "#ced4da",
    "accents-5": "#adb5bd",
    "accents-6": "#868e96",
    "accents-7": "#495057",
    "accents-8": "#343a40",
    "accents-9": "#212529",
    violet: { main: "#5f3dc4", light: "#7048e8" },
    pink: "#e64980",
    cyan: "#22b8cf",
    blue: {
      dark: "#485D7D",
      light: "#6B82A6",
      main: "#5375A0",
    },
    green: "#37b679",
    red: "#da3c3c",
    selection: "#22b8cf",
  },
}

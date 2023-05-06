const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
      maxWidth: {
        "8xl": "1920px",
      },
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        primary: "var(--primary)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        "primary-2": "var(--primary-2)",
        secondary: "var(--secondary)",
        "secondary-2": "var(--secondary-2)",
        hover: "var(--hover)",
        "hover-1": "var(--hover-1)",
        "hover-2": "var(--hover-2)",
        "accents-0": "var(--accents-0)",
        "accents-1": "var(--accents-1)",
        "accents-2": "var(--accents-2)",
        "accents-3": "var(--accents-3)",
        "accents-4": "var(--accents-4)",
        "accents-5": "var(--accents-5)",
        "accents-6": "var(--accents-6)",
        "accents-7": "var(--accents-7)",
        "accents-8": "var(--accents-8)",
        "accents-9": "var(--accents-9)",
        violet: { main: "var(--violet)", light: "var(--violet-light)" },
        pink: { main: "var(--pink)" },
        cyan: { main: "var(--cyan)" },
        blue: {
          dark: "#485D7D",
          light: "#6B82A6",
          main: "#5375A0",
        },
        teal: "#32de8a",
        green: { main: "var(--green)" },
        red: { main: "#d72638" },
        // white: "#fffaff",
        black: "#0d1821",
        accent: "#5375A0",
        "accent-dark": "#485D7D",
        "accent-light": "#5375A0",
        highlight: "#37b679",
        error: "#d72638",
      },
      fontFamily: {
        exo: ["Exo", "sans-serif"],
        // montserrat: ["Montserrat", "sans-serif"],
        sans: ["Exo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}

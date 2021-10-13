module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

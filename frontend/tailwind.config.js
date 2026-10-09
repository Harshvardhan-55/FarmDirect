/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#f3f8ef",
          100: "#e4f0dc",
          200: "#c8e2bb",
          300: "#a4ce91",
          400: "#79b666",
          500: "#579c4a",
          600: "#3f8038",
          700: "#33652f",
          800: "#2b5129",
          900: "#254425"
        },
        earth: {
          50: "#fbf8f2",
          100: "#f4ecdc",
          200: "#e8d7b7",
          300: "#d9bd8d",
          400: "#c59d64",
          500: "#ad7e47",
          600: "#91613a",
          700: "#754b31",
          800: "#603d2b",
          900: "#503326"
        }
      },
      boxShadow: {
        soft: "0 10px 35px rgba(37, 68, 37, 0.08)"
      }
    }
  },
  plugins: []
};
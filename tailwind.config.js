/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f6c71e",
        "text-main": "#414042",
        "background-light": "#ffffff",
        "background-dark": "#0f171a",
        "deep-teal": "#19272b",
        "deep-teal-dark": "#0d1417",
        "divider": "#d9d9d9",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
      },
    },
  },
  plugins: [],
}

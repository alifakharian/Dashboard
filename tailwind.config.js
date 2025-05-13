/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      smd: "260px",
    },
  },
  plugins: [],
};

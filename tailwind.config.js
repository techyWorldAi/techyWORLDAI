/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        ink: "#0d0d0d",
        "ink-soft": "#1a1a1a",
        muted: "#888888",
        border: "#e8e8e8",
        "off-white": "#f7f7f5",
      },
    },
  },
  plugins: [],
};

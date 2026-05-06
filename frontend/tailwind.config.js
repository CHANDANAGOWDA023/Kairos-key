/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kairos: {
          purple: "#7C3AED",
          pink: "#EC4899",
          blue: "#3B82F6",
          green: "#10B981",
          yellow: "#FACC15",
          dark: "#0F172A",
          soft: "#F8FAFC",
        },
      },
      boxShadow: {
        glow: "0 24px 80px rgba(124, 58, 237, 0.25)",
        soft: "0 18px 50px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

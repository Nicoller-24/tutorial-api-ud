/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ud: {
          burgundy: "#911414",
          "burgundy-dark": "#6E0F0F",
          charcoal: "#1A1A1A",
          "charcoal-light": "#2D2D2D",
          yellow: "#FFD700",
          "yellow-inst": "#FE9D12",
          "yellow-light": "#FFF8E1",
          red: "#ED1B24",
          gray: "#595959",
          "gray-light": "#A6A6A6",
          "gray-bg": "#F5F5F5",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Hind", "Arial", "Helvetica", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      boxShadow: {
        ud: "0 4px 14px rgba(145, 20, 20, 0.1)",
      },
    },
  },
  plugins: [],
};

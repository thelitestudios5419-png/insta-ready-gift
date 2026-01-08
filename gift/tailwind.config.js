/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-pink": {
          100: "#FFECEE",
          200: "#FADADD",
          300: "#F5BFC4",
          400: "#F1A4AC",
        },
        "deep-rose": {
          300: "#FF9A9A",
          400: "#FF6B6B",
          500: "#F43F5E",
          600: "#E11D48",
        },
      },
    },
  },
  plugins: [],
};

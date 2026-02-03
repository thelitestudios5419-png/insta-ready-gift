/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],
    },
      colors: {
        ivory: "#FAF7F2",
        charcoal: "#2B2B2B",

        crimson: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
        },

        rosewood: {
          300: "#E11D48",
          400: "#BE123C",
          500: "#b51240",
        },

        mist: {
          100: "#F5F5F5",
          200: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};

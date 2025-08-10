/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0C0C0D",
        lightBg: "#18181B",
        hoverBg: "#242428",
        accent: "#1CD760",
        textMain: "#F2F2F2",
        textMuted: "#B2B2B2",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      fontSize: {
        small: ['14px'],
        large: ['16px'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
}

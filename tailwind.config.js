/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.tsx","./src/*.tsx"],
  theme: {
    extend: {
      fontFamily:{
        curry: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "p-blue": "#31D6D6",
        's-blue': '#67CFCF',
        "p-blue-light": "#D6F7F7",
        "p-red": "#FFDDDD",
        "icon-black": "#333333",
        "p-black": "#3E423A"
        
      }
      
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kigali-blue': '#0051ba',
        'kigali-yellow': '#fcd116',
        'kigali-green': '#00a651',
        'kigali-light': '#f8f9fa',
        'kigali-dark': '#212529'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6b21a8'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}


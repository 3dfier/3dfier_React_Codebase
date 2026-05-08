/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F97316',
          teal: '#0F4C75',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #F97316, #0F4C75)',
      },
    },
  },
  plugins: [],
}

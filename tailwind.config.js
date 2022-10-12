/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-crimson' : '#e85a4f',
        'almond-cream' : '#eae7dc',
        'dark-gray' : '#3e3e3e',
        'king-blue' : '#22548c',
        'rainy-blue' : '#5091ad',
        'super-green' : '#5cdb94',
        'sweet-cream' : '#edf5e0',
        'potatoes' : '#e7b589',
        'night-forest' : '#05396b',
        'autumn-red' : '#984447',
        'oxford-blue' : '#02182b',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617'
        }
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}

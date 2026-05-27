/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        card: 'rgba(255, 255, 255, 0.7)',
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5'
        },
        secondary: {
          DEFAULT: '#14b8a6',
          hover: '#0d9488'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
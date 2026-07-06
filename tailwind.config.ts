import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: {
          50: '#f0f1f3',
          100: '#d9dbe0',
          200: '#b3b7c1',
          300: '#8d93a2',
          400: '#676f83',
          500: '#414b64',
          600: '#2d3446',
          700: '#252b3a',
          800: '#1c2230',
          900: '#141824',
          950: '#0e111b',
        },
        gold: {
          50: '#fdf8ed',
          100: '#f9edcc',
          200: '#f3d999',
          300: '#edc566',
          400: '#e7b133',
          500: '#d4a017',
          600: '#a98012',
          700: '#7f600e',
          800: '#554009',
          900: '#2b2005',
          950: '#151002',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

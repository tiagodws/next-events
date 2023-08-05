/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      animation: {
        enter: 'enter .2s ease-out',
        leave: 'leave .15s ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': {
            opacity: '0',
            transform: 'scale(.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        leave: {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(.9)',
          },
        },
      },
    },
  },
  daisyui: {
    themes: ['light'],
  },
};

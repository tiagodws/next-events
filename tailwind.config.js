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
    themes: [
      {
        mytheme: {
          primary: '#554994',
          secondary: '#ACB1D6',
          accent: '#63d6c5',
          neutral: '#555555',
          'base-100': '#f7f7f7',
          info: '#C0DBEA',
          success: '#C8E4B2',
          warning: '#FFD966',
          error: '#f87272',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.75rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.5s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-text-case': 'normal-case', // set default text transform for buttons
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem', // border radius of tabs
        },
      },
    ],
  },
};

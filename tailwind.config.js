// eslint-disable-next-line @typescript-eslint/no-var-requires
const { neutral } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        gray: neutral,
      },
      fontFamily: {
        sans: ['var(--inter)', 'var(--noto-hk)', 'var(--noto-sc)'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.blue.600'),
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
            },
            color: theme('colors.gray.700'),
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            p: {
              color: theme('colors.gray.700'),
            },
            strong: {
              color: theme('colors.gray.600'),
            },
          },
        },
        dark: {
          css: {
            a: {
              color: theme('colors.blue.300'),
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
            },
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.gray.300'),
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.300'),
            },
            p: {
              color: theme('colors.gray.400'),
            },
            strong: {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
};

module.exports = config;

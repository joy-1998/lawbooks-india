import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EBF0',
          100: '#C5CCD9',
          500: '#3D5A80',
          600: '#2C4A6E',
          700: '#1B3A5C',
          800: '#1B2A4A',
          900: '#0F1B30',
        },
        gold: {
          50: '#FBF7ED',
          100: '#F5ECCE',
          400: '#D4B45A',
          500: '#C9A84C',
          600: '#B8963E',
          700: '#A07B2F',
        },
        cream: '#FAFAF8',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Playfair Display', 'serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

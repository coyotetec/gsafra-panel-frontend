/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        'gray-400': '#EEEEEE',
        'gray-500': '#CCCCCC',
        'gray-600': '#646464',
        'primary-40': '#CCECDE',
        'primary-50': '#ABDFC8',
        'primary-100': '#8AD1B2',
        'primary-200': '#6AC39B',
        'primary-300': '#4BB485',
        'primary-400': '#2CA46F',
        'primary-500': '#0E9458',
        'primary-600': '#0B874F',
        'primary-700': '#097947',
        'primary-800': '#076B3E',
        'primary-900': '#055D35',
        'primary-950': '#034E2C',
        'primary-960': '#023F24',
        'secondary-40': '#FFF7CC',
        'secondary-50': '#FFF0AA',
        'secondary-100': '#FFE989',
        'secondary-200': '#FFE26A',
        'secondary-300': '#FFDA4B',
        'secondary-400': '#FFD12E',
        'secondary-500': '#FFC812',
        'secondary-600': '#DFB10C',
        'secondary-700': '#BF9907',
        'secondary-800': '#9F8104',
        'secondary-900': '#806801',
        'black-50': 'rgba(0,0,0,0.5)',
        'black-70': 'rgba(0,0,0,0.7)',
        'black-80': 'rgba(0,0,0,0.8)',
        'black-100': '#000000',
        'red-500': '#F03C37',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-linear-green':
          'linear-gradient(180deg, #2AC763 0%, #2AC764 0.01%, #0E9458 100%)',
      },
      gridTemplateColumns: {
        init: '56% 1fr',
      },
      fontSize: {
        '3.5xl': '2rem',
        '2xs': '0.625rem'
      },
      maxWidth: {
        content: '1440px',
        104: '24.875rem',
        '8xl': '81rem',
      },
      height: {
        'calc-img': 'calc(100vh - 32px)',
        'calc-sidebar': 'calc(100vh - 7rem)',
        13: '3.25rem',
        50: '12.5rem',
      },
      width: {
        50: '13.75rem',
        82: '20.5rem',
      },
      minHeight: {
        'calc-main': 'calc(100vh - 7rem)',
      },
      margin: {
        6.5: '1.625rem',
        1.5: '0.375rem',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      lineHeight: {
        '2xs': '0.75rem'
      },
      padding: {
        18: '4.5rem',
        2.5: '0.625rem',
      },
      boxShadow: {
        '2xl': `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`
      }
    },
  },
  plugins: [],
};

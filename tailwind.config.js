/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        GGray400: '#EEEEEE',
        GGray500: '#CCCCCC',
        GGray600: '#646464',
        primary40: '#CCECDE',
        primary50: '#ABDFC8',
        primary100: '#8AD1B2',
        primary200: '#6AC39B',
        primary300: '#4BB485',
        primary400: '#2CA46F',
        primary500: '#0E9458',
        primary600: '#0B874F',
        primary700: '#097947',
        primary800: '#076B3E',
        primary900: '#055D35',
        primary950: '#034E2C',
        primary960: '#023F24',
        secundary40: '#FFF7CC',
        secundary50: '#FFF0AA',
        secundary100: '#FFE989',
        secundary200: '#FFE26A',
        secundary300: '#FFDA4B',
        secundary400: '#FFD12E',
        secundary500: '#FFC812',
        secundary600: '#DFB10C',
        secundary700: '#BF9907',
        secundary800: '#9F8104',
        secundary900: '#806801',
        GBlack50: 'rgba(0, 0, 0, 0.5)',
        GBlack70: 'rgba(0,0,0,0.7)',
        GBlack80: 'rgba(0,0,0,0.8)',
        GBlack100: '#000000',
      },
      gridTemplateColumns: {
        init: '56% 1fr',
      },
      maxWidth: {
        content: '1440px',
        104: '24.875rem',
      },
      height: {
        calcImg: 'calc(100vh - 32px)',
      },
      margin: {
        6.5: '1.625rem',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

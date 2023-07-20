module.exports = {
  content: ["./renderer/**/*.{html,js}"],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    colors: {
      'transparent': 'transparent',
      'currentColor': 'currentColor',
      'selected': 'rgba(255,255,255,0.10)',
      'interaction': {
        DEFAULT: '#86482C',
        100: '#86482C',
        200: '#86482C',
        300: '#86482C',
        400: '#86482C',
        500: '#86482C',
        600: '#CB8260',
        700: '#CB8260',
        800: '#CB8260',
        900: '#CB8260'
      },
      'primary': {
        DEFAULT: '#C5D6B7',
        100: '#C5D6B7',
        200: '#C5D6B7',
        300: '#C5D6B7',
        400: '#C5D6B7',
        500: '#C5D6B7',
        600: '#C5D6B7',
        700: '#C5D6B7',
        800: '#C5D6B7',
        900: '#C5D6B7'
      },
      'secondary': {
        DEFAULT: '#86482C',
        100: '#86482C',
        200: '#86482C',
        300: '#86482C',
        400: '#86482C',
        500: '#86482C',
        600: '#CB8260',
        700: '#CB8260',
        800: '#CB8260',
        900: '#CB8260'
      },
      'tertiary': {
        DEFAULT: '#571819',
        100: '#571819',
        200: '#571819',
        300: '#571819',
        400: '#571819',
        500: '#571819',
        600: '#571819',
        700: '#571819',
        800: '#571819',
        900: '#571819'
      },
      'font': {
        DEFAULT: '#FFFFFF',
        100: '#FFFFFF',
        200: '#FFFFFF',
        300: '#FFFFFF',
        400: '#FFFFFF',
        500: '#FFFFFF',
        600: '#FFFFFF',
        700: '#FFFFFF',
        800: '#FFFFFF',
        900: '#FFFFFF'
      },
      'foreground': {
        DEFAULT: '#1f2937',
        100: '#1f2937',
        200: '#1f2937',
        300: '#1f2937',
        400: '#1f2937',
        500: '#1f2937',
        600: '#1f2937',
        700: '#1f2937',
        800: '#1f2937',
        900: '#1f2937'
      },
      'background': {
        DEFAULT: '#13131B',
        100: '#13131B',
        200: '#13131B',
        300: '#13131B',
        400: '#13131B',
        500: '#13131B',
        600: '#13131B',
        700: '#13131B',
        800: '#13131B',
        900: '#13131B'
      },
      'border': {
        DEFAULT: '#FFFFFF',
        100: '#FFFFFF',
        200: '#FFFFFF',
        300: '#FFFFFF',
        400: '#FFFFFF',
        500: '#FFFFFF',
        600: '#FFFFFF',
        700: '#FFFFFF',
        800: '#FFFFFF',
        900: '#FFFFFF'
      },

      'disabled': {
        DEFAULT: '#A9A9A9',
        100: '#A9A9A9',
        200: '#A9A9A9',
        300: '#A9A9A9',
        400: '#A9A9A9',
        500: '#A9A9A9',
        600: '#A9A9A9',
        700: '#A9A9A9',
        800: '#A9A9A9',
        900: '#A9A9A9'
      },
      'warning': {
        DEFAULT: '#B63737',
        100: '#B63737',
        200: '#B63737',
        300: '#B63737',
        400: '#B63737',
        500: '#B63737',
        600: '#FF0000',
        700: '#FF0000',
        800: '#FF0000',
        900: '#FF0000'
      },
    },
    fontFamily: {
      'sans': ['Gunplay', 'Roboto', 'sans-serif']
    },
    extend: {
      spacing: {
        none: '0'
      }
    }
  },
  plugins: [],
}
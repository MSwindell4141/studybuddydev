module.exports = {
  content: ['{pages,components}/**/*.{html,js,ts,tsx}'],
  theme: {
    fontFamily: {
      'main': ['Open Sans', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        100: '#fafafa',
        200: '#eaeaea',
        300: '#e0e0e0',
        400: '#cacaca',
        500: '#8a8a8a',
        600: '#4a4a4a',
        700: '#292929',
        800: '#1a1a1a',
        900: '#0a0a0a',
      },
      green: {
        100: '#e4f0e4',
        200: '#8ce692',
        300: '#6dd173',
        400: '#54b35a',
        500: '#419146',
        600: '#357839',
        700: '#2b612e',
        800: '#1e4520',
        900: '#132b14',
      },
      error: {
        500: '#e65151',
        600: '#d64040',
        700: '#ab3838',
      },
      info: {
        500: '#f7c743',
      },
      github: {
        500: '#262f3d',
        600: '#0D1117',
      },
      discord: {
        500: '#576cb3',
        600: '#435ba8',
      },
    },
    fontSize: {
      '2xs': '12px',
      'xs': '13px',
      'sm': '14px',
      'md': '15px',
      'lg': '16px',
      'xl': '20px',
      '2xl': '26px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '44px',
      '6xl': '64px',
    },
    lineHeight: {
      'xs': '1em',
      'sm': '1.125em',
      'md': '1.25em',
      'lg': '1.5em',
      'xl': '1.6em',
    },
    letterSpacing: {
      'sm': '-0.0375em',
      'md': '0em',
      'lg': '0.025em',
    },
    boxShadow: {
      'sm': '0 2px 8px rgba(0, 0, 0, 0.2)',
      'md': '0 5px 12px rgba(0, 0, 0, 0.25)',
      'lg': '0 8px 20px rgba(0, 0, 0, 0.3)',
    },
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
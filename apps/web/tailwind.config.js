/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        gray: {
          50: '#f7f8fa',
          100: '#ebedf4',
          200: '#d7d8db',
          300: '#c0c2c5',
          400: '#a1a4a9',
          500: '#898c8e',
          600: '#78797c',
          700: '#616264',
          800: '#424242',
          900: '#212121',
        },
        black: '#000000',
        blue: {
          100: '#f3f6ff',
          200: '#e0e8ff',
          300: '#b3c6fc',
          400: '#9bb6ff',
          500: '#7c9df8',
          600: '#698df3',
          700: '#5885fc',
          800: '#5c7add',
        },
        purple: {
          100: '#faf7ff',
          500: '#b99af7', // use 90% of opacity
          600: '#b199e2',
          700: '#9b7cd9',
        },
        yellow: '#faca60',
        naver: '#02C75A',
        warning: '#eb535d',
        informative: '#5599ff',
        background: 'hsl(var(--background))', // required
        foreground: 'hsl(var(--foreground))', // required
        border: 'hsl(var(--border))', // required
      },
      fontSize: {
        h1: [
          '20px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        h2: [
          '17px',
          {
            lineHeight: '24px',
            fontWeight: '600',
          },
        ],
        h3: [
          '16px',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        h4: [
          '15px',
          {
            lineHeight: '20px',
            fontWeight: '600',
          },
        ],
        b1: [
          '15px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
        b2: [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
        b3: [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '400',
          },
        ],
        b3_com: [
          '14px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        b4: [
          '13px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
        b5: [
          '13px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        c1: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
        c2: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
        c3: [
          '11px',
          {
            lineHeight: '14px',
            fontWeight: '500',
          },
        ],
      },
      borderWidth: {
        DEFAULT: '1px',
        3: '3px',
        2: '2px',
        '.5': '0.5px',
        1.5: '1.5px',
      },
      borderRadius: {
        DEFAULT: '8px',
        20: '20px',
        16: '16px',
        12: '12px',
        4: '4px',
        2: '2px',
      },
      width: {
        mobile: '',
        343: '343px',
        300: '300px',
        272: '272px',
        250: '250px',
        240: '240px',
        95: '95px',
        80: '80px',
        56: '56px',
        40: '40px',
        32: '32px',
        26: '26px',
        24: '24px',
        20: '20px',
        16: '16px',
        1: '1px',
      },
      height: {
        343: '343px',
        264: '264px',
        196: '196px',
        80: '80px',
        58: '58px',
        56: '56px',
        48: '48px',
        40: '40px',
        32: '32px',
        28: '28px',
        26: '26px',
        24: '24px',
        20: '20px',
        16: '16px',
      },
      padding: {
        28: '28px',
        18: '18px',
        16: '16px',
        14: '14px',
        12: '12px',
        10: '10px',
        9: '9px',
        8: '8px',
        7: '7px',
        6: '6px',
        5: '5px',
        4: '4px',
      },
      margin: {
        bottomMargin: '64px',
        100: '100px',
        48: '48px',
        32: '32px',
        24: '24px',
        20: '20px',
        16: '16px',
        12: '12px',
        8: '8px',
        4: '4px',
        2: '2px',
      },
      gap: {
        32: '32px',
        12: '12px',
        8: '8px',
        4: '4px',
        2: '2px',
      },
      boxShadow: {
        '16dp': '0px 4px 30px -10px rgba(0, 0, 0, 0.25)',
        '24dp': '0px 10px 60px -10px rgba(0, 0, 0, 0.25)',
      },
      translate: {
        25: '25px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  safelist: ['w-[160px]', 'w-[168px]', 'w-[192px]'],
  plugins: [require('tailwindcss-animate')],
};

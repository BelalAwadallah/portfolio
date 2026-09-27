/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#F7F4F2',
        'bg-card': '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#707070',
        'text-muted': '#96918D',
        'maroon': {
          DEFAULT: '#3C1516',
          hover: '#512024',
          dark: '#2B0E0F',
          light: '#5A1F21'
        },
        'border-light': '#E5E1DD',
        'dark-surface': '#1A1A1A',
        'dark-surface-soft': '#292323',
        'dark-text': '#F5F0EC',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'soft': '0 20px 40px rgba(0, 0, 0, 0.06)',
        'soft-hover': '0 25px 45px rgba(0, 0, 0, 0.1)',
        'frame': '0 24px 48px -12px rgba(26, 26, 26, 0.08), 0 0 0 1px rgba(229, 225, 221, 0.6)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
};

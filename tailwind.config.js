/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'bg-card': 'rgb(var(--bg-card-rgb) / <alpha-value>)',
        'bg-card-subtle': 'var(--bg-card-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'maroon': {
          DEFAULT: 'var(--accent-maroon)',
          hover: 'var(--accent-maroon-hover)',
          dark: '#2B0E0F',
          light: '#5A1F21'
        },
        'border-light': 'var(--border-light)',
        'dark-surface': 'var(--dark-surface)',
        'dark-surface-soft': 'var(--dark-surface-soft)',
        'dark-text': 'var(--dark-text)',
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

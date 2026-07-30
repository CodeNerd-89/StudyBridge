/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a2b48',
        'on-primary': '#ffffff',
        secondary: '#e0f2f1',
        'on-secondary': '#1a2b48',
        accent: '#26a69a',
        'accent-teal': '#009B9B',
        background: '#f8f9ff',
        surface: '#ffffff',
        'surface-variant': '#d3e4fe',
        'surface-container': '#e5eeff',
        'surface-container-low': '#eff4ff',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#44474d',
        outline: '#cbd5e1',
        'outline-variant': '#c5c6ce',
        'text-main': '#1e293b',
        'text-muted': '#64748b',
        'deep-navy': '#1a2b48',
        // Keep old brand tokens for backward compat in other pages
        brand: {
          DEFAULT: '#1a2b48',
          dark: '#0f1d33',
          light: '#e0f2f1',
          soft: '#e0f2f1',
          border: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(26, 43, 72, 0.05)',
        'soft-hover': '0 10px 30px -5px rgba(26, 43, 72, 0.1)',
        academic: '0 4px 20px -2px rgba(26, 43, 72, 0.05)',
      },
    },
  },
  plugins: [],
};

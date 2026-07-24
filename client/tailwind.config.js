/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        brand: '#E35F39',
        accent: '#F97316',
        background: '#FFF8F5',
        muted: '#F4E4DC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(227, 95, 57, 0.14)',
      },
    },
  },
  plugins: [],
};

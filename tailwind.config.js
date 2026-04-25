/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cu: {
          yellow: '#FFD333',
          'yellow-deep': '#F5C518',
          ink: '#0F1115',
          slate: '#5F6470',
          line: '#E8E6E1',
          paper: '#FAF8F3',
          plum: '#7A1F3D',
          green: '#1F7A4D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,17,21,0.04), 0 8px 24px rgba(15,17,21,0.06)',
        bar: '0 -8px 24px rgba(15,17,21,0.08)',
      },
    },
  },
  plugins: [],
}

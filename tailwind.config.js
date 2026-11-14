/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SoilSync Brand Colors
        soilsync: {
          forest: '#123D2A',       // Deep Forest Green
          dark: '#0a1d14',         // Ultra-dark background forest green
          emerald: '#16A36A',      // Emerald Green
          light: '#E7F4E9',        // Light Green
          white: '#FFFFFF',        // Pure White
          techblue: '#3478C9',     // Technology Blue
          blueglow: '#4A90E2',
          surface: '#153225',      // Card surface
          surfacelight: '#1d4232', // Hover surface
          border: 'rgba(22, 163, 106, 0.25)',
        },
        nasa: {
          blue: '#0B3D91',
          cyan: '#00E5FF',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-emerald': '0 0 35px -5px rgba(22, 163, 106, 0.35)',
        'glow-tech': '0 0 35px -5px rgba(52, 120, 201, 0.35)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Familiada color palette
        'familiada': {
          'bg-dark': '#0a0a1a',      // Deep dark blue/black background
          'bg-panel': '#1a1a3a',      // Panel background
          'border': '#3a3a6a',        // Border color
          'gold': '#ffd700',          // Gold for points, highlights
          'gold-dark': '#b8960f',     // Darker gold
          'orange': '#ff8c00',        // Orange accents
          'red': '#dc2626',           // Error/X color
          'green': '#22c55e',         // Success color
          'text-primary': '#ffffff',  // Primary text
          'text-secondary': '#a0a0c0', // Secondary text
          'answer-hidden': '#2a2a4a', // Hidden answer background
          'answer-revealed': '#1e3a5f', // Revealed answer background
        }
      },
      fontFamily: {
        'display': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        'body': ['Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'reveal': 'reveal 0.5s ease-out',
        'wrong': 'wrong 0.5s ease-in-out',
        'pulse-gold': 'pulse-gold 2s infinite',
      },
      keyframes: {
        reveal: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        wrong: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 5px #ffd700' },
          '50%': { boxShadow: '0 0 20px #ffd700, 0 0 30px #ffd700' },
        },
      },
    },
  },
  plugins: [],
}

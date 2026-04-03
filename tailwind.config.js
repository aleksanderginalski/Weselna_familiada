/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Familiada color palette — aligned with Design Brief v1.0
        'familiada': {
          'bg-dark': '#0a1628',       // Main board background
          'bg-panel': '#1a2744',      // Answer rows, panels
          'border': '#334155',        // Subtle borders
          'gold': '#fbbf24',          // Scores, revealed text, highlights
          'gold-dark': '#b45309',     // Darker gold for hover states
          'orange': '#f97316',        // Orange accents
          'red': '#ef4444',           // Mistakes (X), error states
          'green': '#22c55e',         // Success color
          'text-primary': '#ffffff',  // Main text
          'text-secondary': '#9ca3af', // Secondary info (gray-400)
          'answer-hidden': '#1e3a5f', // Hidden answer background
          'answer-revealed': '#1a2744', // Revealed answer background
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

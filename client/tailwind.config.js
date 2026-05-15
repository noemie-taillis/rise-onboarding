/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        inter:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        rise: {
          violet:   '#7C3AED',
          'violet-l': '#A78BFA',
          coral:    '#FF8B94',
          sky:      '#7DB8E8',
          peach:    '#FFB088',
          lavender: '#C7B9F5',
          night:    '#0F0A1F',
          'night-m': '#1A0F2E',
          card:     '#1A1530',
          text:     '#F5F3FF',
          muted:    '#9CA3C4',
        },
      },
    },
  },
  plugins: [],
};

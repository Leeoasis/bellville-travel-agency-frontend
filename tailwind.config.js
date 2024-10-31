module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        tang: ["Tangerine", "serif"],
        ice: ["Iceberg", "sans-serif"],
        nosi: ["Nosifer", "sans-serif"],
      },
      colors: {
        'olive-700': '#4A5D23',
        'olive-600': '#5A6F2F',
        'olive-500': '#6A7F3D',
      },
      backgroundImage: {
        'olive-green-gradient': 'linear-gradient(to right, #3A5A40, #2F4F2F)',
      },
    },
  },
  plugins: [],
}

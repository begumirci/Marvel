/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#e62429',
        gray: '#151515',
      },
      backgroundImg: {
        backgroundImage:
          'url(https://pasajblog.turkcell.com.tr/wp-content/uploads/2023/12/marvel-universe-i31869.jpg)',
      },
    },
  },
  plugins: [],
};

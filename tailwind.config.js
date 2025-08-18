/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is essential for dark: utilities to work
  theme: {
    extend: {},
  },
  plugins: [],
}
};

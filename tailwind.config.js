/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Vite uses index.html as the entry point
    './src/**/*.{js,ts,jsx,tsx}', // Scans your source files for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


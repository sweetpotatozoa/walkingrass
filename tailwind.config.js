/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Next.js 페이지 경로
    './components/**/*.{js,ts,jsx,tsx}', // Next.js 컴포넌트 경로
    './app/**/*.{js,ts,jsx,tsx}', // Next.js app 경로 (필요한 경우)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

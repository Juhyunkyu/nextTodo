/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 커스텀 색상이 필요한 경우 여기에 추가
      },
      animation: {
        // 커스텀 애니메이션이 필요한 경우 여기에 추가
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/*.jsx",
    "./info/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        comfotaa:["comfotaa"],
        sacramento:["sacramento"]

      }

    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}

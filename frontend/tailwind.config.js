/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'sans' : ['Poppins', 'sans-serif']
    },
    colors : {
      navBg : "#172554",
      headingCl : "#0c0a09",
      textCl : "#171717",
      backgroundCl : "#f9f9f9",
      hoverCl : "#717A96",
      success : '#4bb543'
    },
    extend: {},
  },
  plugins: [
    
  ],
}


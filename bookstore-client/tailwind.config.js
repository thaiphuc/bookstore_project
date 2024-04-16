/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        red: "#FF6868",
        secondary: "#555",
        prigmayBG: "#FCFCFC",
        mainBG: "#00d3b7",
        "light-purple": "#9999FF",
        "light-purple-200": "#CCCCFF",
        "light-pink": "#FF99CC",
        pink:"#FF6699",
        cl1: "#FFC7BA",
        cl2: "#FB9EC4",
        cl3: "#A2DCEE",
        cl4: "#ADEEE2",
      },
    },
  },
  plugins: [require("daisyui")],
};

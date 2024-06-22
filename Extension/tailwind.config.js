/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "navy-blue": "#2f3d5c",
        gunmetal: "#161625",
        Charcoal: "#212121",
        Platinum: "#e8e8e8",
        Gainsboro: "#e0e0e0",
        Alice_Blue: "#f2f3f7",
        Onyx: "#353535",
      },
      backgroundImage: {
        blocked: "url('/src/assets/blocked.svg')",
        notFound: "url('/src/assets/404.svg')",
      },
      height: {
        "calc-vh": "calc(100vh - 1.25rem)",
        "calc-vh-2": "calc(100vh - 2.5rem)",
      },
      width: {
        "calc-vw": "calc(100vw - 16rem)",
      },
    },
  },
  plugins: [],
};

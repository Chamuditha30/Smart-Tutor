/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        st_blue: "#4D7CFE",
        st_red: "#FB5454",
        st_green: "#2ACAB6",
        st_dark_gray: "#34373E",
        st_light_gray: "#F5F6F8",
      },
    },
  },
  plugins: [],
};

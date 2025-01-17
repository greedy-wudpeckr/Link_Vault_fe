/** @type {import('tailwindcss').Config} */

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const { transform } = require('typescript');

const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");




module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        blob:{
          "0%":{
            translate:"0 0",
            rotate:"0deg"
          },
          "30%":{
            rotate:"40deg",
          },
          "50%":{
            transform:"translate(300px , 390px) scale(1.1)",
          },
          "80%":{
            rotate:"90%"
          }
        },
      },
      animation:{
        blob:"blob 8s infinite cubic-bezier(0.6,-0.28 , 0.735,0.045)",
        "blob-reverse":"blob 10s infinite cubic-bezier(0.215,0.61 , 0.335, 1) reverse"
    },
      colors: {
        purple: {
          600: "#5046E4",
          200: "#E1E9FF",
          400: "#ADABF5",
        },
        law : "#0f0c29",
        ren : "#302b63",
        cium : "#24243e",
        pp : "#4b25b2"
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      zIndex:{
        "1" : "1",
      }
    },
  },
  plugins: [addVariablesForColors],
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        "bg-grid": (value) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-grid-small": (value) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-dot": (value) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
          )}")`,
        }),
      },
      { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    );
  },
};

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key.replace(/\//g, "-")}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

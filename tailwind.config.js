/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: "#111827", // Dark gray base
      accent: "#EAB308", // Gold highlight (Klyra brand)
      light: "#F9FAFB",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
};
export const plugins = [];
import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgInverse: "#373a3c",
        lightGray: "#c2ccce",
        primary: "#58170d",
        secondary: "#c9ae6b",
        textPrimary: "#373a3c",
        white: "#fcfcf5",
      },
    },
  },
  plugins: [aspectRatio, forms, typography],
};

export default config;

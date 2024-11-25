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
        bgInverse: "var(--color-bg-inverse)",
        lightGray: "var(--color-bg-info)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        textPrimary: "var(--color-text-primary)",
        white: "var(--color-bg-light)",
        navButton: "var(--color-nav-button)",
      },
    },
  },
  plugins: [aspectRatio, forms, typography],
};

export default config;

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
        navButton: "var(--color-nav-button)",
        white: "var(--color-bg-light)",
        background: "var(--color-bg-light)",
        foreground: "var(--color-text-primary)",
        card: {
          DEFAULT: "var(--color-bg-info)",
          foreground: "var(--color-text-primary)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-bg-light)",
        },
        secondary: {
          DEFAULT: "var(--color-nav-button)",
          foreground: "var(--color-text-primary)",
        },
        accent: "var(--color-secondary)",
        input: "var(--color-bg-info)",
        ring: "var(--color-primary)",
      },
    },
  },
  plugins: [aspectRatio, forms, typography],
};

export default config;

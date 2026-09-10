import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "hsl(var(--color-ink))",
        paper: "hsl(var(--color-paper))",
        brand: "hsl(var(--color-brand))",
        line: "hsl(var(--color-line))",
      },
    },
  },
  plugins: [],
};

export default config;

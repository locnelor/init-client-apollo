import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        base: 'var(--color-base)',
      },
      textColor: {
        base: 'var(--color-text-base)',
      },
    },
  },
  plugins: [],
};
export default config;

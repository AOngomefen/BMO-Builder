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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bmo-green": "#78BCA8",
        "bmo-teal": "#5A9A88",
        "bmo-dark": "#1a3a32",
        "bmo-cream": "#FAF8F5",
        "bmo-amber": "#E8A838",
        "bmo-red": "#E85D75",
        "bmo-blue": "#4A90D9",
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        bmo: "16px",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: 'hsl(var(--primary))',
  			secondary: 'hsl(var(--secondary))',
  			tertiary: 'hsl(var(--tertiary))',
			dark: 'hsl(var(--text-dark))',
			light: 'hsl(var(--text-light))'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

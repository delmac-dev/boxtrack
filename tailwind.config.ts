import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "poppins": ["Poppins", "sans-serif"]
    },
  	extend: {
  		colors: {
  			primary: 'hsl(var(--primary))',
  			secondary: 'hsl(var(--secondary))',
  			tertiary: 'hsl(var(--tertiary))',
        dark: 'hsl(var(--dark))',
        light: 'hsl(var(--light))'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

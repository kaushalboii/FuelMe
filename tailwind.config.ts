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
        'floral-white': '#FAF8F5',
        'yellow-v2': '#FFDD00',
        'yellow-hover': '#FACC15',
        bmc: {
          yellow: '#FFDD00',
          hover: '#FACC15',
          cream: '#FAF8F5',
          dark: '#18181b',
        },
        fuel: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#FFDD00',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'bmc': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'bmc-hover': '0 14px 40px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;

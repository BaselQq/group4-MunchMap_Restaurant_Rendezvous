import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#03BEC7',
        'secondary': '#25CFBE',
        'accent': {
          100: '#ffd8db',
          500: '#ffb1b7',
          900: '#FF6269',
        },
        'neutral': '#103351',
        'warning': '#F9F871',
        'success': '#C1F380',
        'error': '#DA588B',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;

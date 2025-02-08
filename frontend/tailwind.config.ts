import type { Config } from "tailwindcss";

export default {
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
      },
      keyframes: {
        'glitch-1': {
          '0%, 100%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(1px, -1px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
        },
        'glitch-2': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(2px, -1px)' },
          '45%': { transform: 'translate(-1px, 2px)' },
          '65%': { transform: 'translate(1px, -1px)' },
          '85%': { transform: 'translate(-1px, 1px)' },
        },
        'glitch-text': {
          '0%, 100%': { transform: 'translate(0) skew(0deg)', textShadow: 'none', opacity: '1' },
          '10%': { transform: 'translate(-2px) skew(-5deg)', textShadow: '-2px 0 #ff0000', opacity: '0.9' },
          '20%': { transform: 'translate(2px) skew(5deg)', textShadow: '2px 0 #00ff00', opacity: '0.8' },
          '30%': { transform: 'translate(-2px) skew(-5deg)', textShadow: '-2px 0 #00ff00', opacity: '0.9' },
          '40%': { transform: 'translate(2px) skew(5deg)', textShadow: '2px 0 #ff0000', opacity: '1' },
          '50%': { transform: 'translate(0) skew(0deg)', textShadow: 'none', opacity: '1' },
        },
      },
      animation: {
        'glitch-1': 'glitch-1 4s infinite',
        'glitch-2': 'glitch-2 3s infinite',
        'glitch-text': 'glitch-text 2.5s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;

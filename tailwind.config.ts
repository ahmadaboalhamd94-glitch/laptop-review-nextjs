import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-2': '#242424',
        border: '#2a2a2a',
        accent: '#3b82f6',
        'accent-2': '#22c55e',
      }
    },
  },
  plugins: [],
}
export default config

import tailwindcssAnimate from 'tailwindcss-animate'
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  screens: {
    mobile: { max: '768px' },
    md: '768px',
    lg: '1024px',
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        heading: ['Outfit', 'Arial', 'sans-serif'],
      },
      colors: {
        neutral: {
          50: '#f6f6f6',
          100: '#eaeaea',
          200: '#cccccc',
          300: '#a5a5a5',
          400: '#6d6d6d',
          500: '#191919',
          600: '#141414',
          700: '#0f0f0f',
          800: '#0b0b0b',
          900: '#050505',
          DEFAULT: '#191919',
        },
        primary: {
          50: '#e4e9f5',
          100: '#c2cdec',
          200: '#95abd9',
          300: '#647dc0',
          400: '#425fa7',
          500: '#001A57',
          600: '#001749',
          700: '#00133b',
          800: '#000f2f',
          900: '#000a1f',
          DEFAULT: '#001A57',
        },
        secondary: {
          50: '#ffe7e8',
          100: '#ffc7c9',
          200: '#ff9ca0',
          300: '#ff6e74',
          400: '#ff4850',
          500: '#FF202A',
          600: '#e01a23',
          700: '#b2151c',
          800: '#861016',
          900: '#600b10',
          DEFAULT: '#FF202A',
        },
        accent: {
          50: '#e4f0ff',
          100: '#c2dbff',
          200: '#95bfff',
          300: '#649fff',
          400: '#4287ff',
          500: '#0060D7',
          DEFAULT: '#0060D7',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        modal: '0 8px 20px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate, nextui()],
}

export default tailwindConfig

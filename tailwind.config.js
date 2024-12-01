import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'], // Suporte para tema escuro
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Diretórios observados
  theme: {
    extend: {
      // Fontes customizadas
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Define Inter como fonte padrão
        heading: ['Outfit', 'Arial', 'sans-serif'], // Fonte alternativa para títulos
      },

      // Configuração de cores
      colors: {
        // Tons neutros
        neutral: {
          DEFAULT: '#191919',
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
        },

        // Cores primárias
        primary: {
          DEFAULT: '#001A57',
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
        },

        // Cores secundárias
        secondary: {
          DEFAULT: '#FF202A',
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
        },

        // Cores adicionais
        accent: {
          DEFAULT: '#0060D7',
          50: '#e4f0ff',
          100: '#c2dbff',
          200: '#95bfff',
          300: '#649fff',
          400: '#4287ff',
          500: '#0060D7',
        },
      },

      // Configuração de sombras
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para cartões
        modal: '0 8px 20px rgba(0, 0, 0, 0.15)', // Sombra para modais
      },

      // Configuração de bordas
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

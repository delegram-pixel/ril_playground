/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#177AE5',
          light: '#2EA3E5',
          dark: '#1262B8',
        },
        brown: {
          DEFAULT: '#29CC6E',
          light: '#4DD88A',
          dark: '#1FA858',
        },
        teal: {
          DEFAULT: '#29BDCC',
          light: '#4DD0DB',
          dark: '#1F97A3',
        },
        success: '#29CC6E',
        warning: '#F59E0B',
        alert: '#EF4444',
        brand: {
          black: '#212120',
          gray: {
            DEFAULT: '#8F9499',
            dark: '#73797F',
            light: '#ABAFB2',
            lighter: '#C7C9CC',
            lightest: '#E3E4E5',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

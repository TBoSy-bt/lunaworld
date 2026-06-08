/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luna: {
          black:   '#030712',
          deep:    '#060d26',
          navy:    '#0c1445',
          indigo:  '#1e1b6e',
          purple:  '#3b0f9e',
          violet:  '#6d28d9',
          lilac:   '#a855f7',
          pink:    '#e879f9',
          glow:    '#c084fc',
          star:    '#f0e6ff',
          mist:    'rgba(168,85,247,0.12)',
        },
      },
      fontFamily: {
        cinzel:  ['Cinzel', 'serif'],
        nunito:  ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'luna-gradient': 'linear-gradient(135deg,#030712 0%,#0c1445 40%,#1e1b6e 70%,#3b0f9e 100%)',
        'glow-radial':   'radial-gradient(ellipse at center,rgba(168,85,247,0.25) 0%,transparent 70%)',
        'card-glass':    'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'luna-glow':  '0 0 40px rgba(168,85,247,0.4)',
        'luna-glow2': '0 0 80px rgba(109,40,217,0.3)',
        'card-glow':  '0 8px 32px rgba(109,40,217,0.25)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'shimmer':      'shimmer 3s linear infinite',
        'twinkle':      'twinkle 2s ease-in-out infinite',
        'slide-up':     'slideUp 0.8s ease-out forwards',
        'fade-in':      'fadeIn 1s ease-out forwards',
        'spin-slow':    'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 30px rgba(168,85,247,0.4)' },
          '50%':     { boxShadow: '0 0 70px rgba(168,85,247,0.8),0 0 120px rgba(109,40,217,0.4)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.3', transform: 'scale(0.7)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

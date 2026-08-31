module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#04070D',
        foreground: '#F2F0EB',
        muted: '#6E7681',
        bmw: {
          carbon: '#04070D',
          sapphire: '#0A1020',
          midnight: '#0B1A2F',
          alpine: '#F2F0EB',
          titan: '#A8B0BB',
          mineral: '#6E7681',
          estoril: '#0066B1',
          daytona: '#1A8DDD',
          mBlue: '#00ADEF',
          mPurple: '#8E44AD',
          mRed: '#E30613',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'vn-float': 'vnFloat 6s ease-in-out infinite',
        'vn-pulse-glow': 'vnPulseGlow 2s ease-in-out infinite',
        'vn-scan': 'vnScan 8s linear infinite',
        'vn-blink': 'vnBlink 1.2s step-end infinite',
        'm-shimmer': 'mShimmer 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        vnFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        vnPulseGlow: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(0,102,177,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(0,102,177,0.6)' },
        },
        vnScan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        vnBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        mShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'bmw-m-stripe': 'linear-gradient(90deg, #00ADEF 0%, #00ADEF 33%, #6E44AD 33%, #6E44AD 66%, #E30613 66%)',
        'bmw-carbon': 'radial-gradient(ellipse at top, rgba(0,102,177,0.08) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

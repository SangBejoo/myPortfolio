/** @type {import('tailwindcss').Config} */
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
        // Doodle-paper palette (fast view): paper surfaces, ink text, one accent
        apple: {
          bg: '#F5F1E6',
          surface: '#FFFDF5',
          'surface-hover': '#FFFFFF',
          'surface-subtle': '#EFE9D8',
          border: 'rgba(29, 29, 31, 0.14)',
          'border-strong': 'rgba(29, 29, 31, 0.3)',
          text: '#1D1D1F',
          'text-secondary': '#6E6E73',
          'text-tertiary': '#86868B',
          blue: '#0A84FF',
          'blue-hover': '#0071E3',
          'blue-subtle': 'rgba(10, 132, 255, 0.12)',
          green: '#30D158',
          amber: '#FF9F0A',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      fontSize: {
        // Apple HIG Strict 6-step scale
        caption: ['12px', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        body: ['14px', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        subhead: ['16px', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        title3: ['19px', { lineHeight: '1.35', letterSpacing: '-0.025em' }],
        title2: ['24px', { lineHeight: '1.25', letterSpacing: '-0.03em' }],
        title1: ['32px', { lineHeight: '1.2', letterSpacing: '-0.035em' }],
        largeTitle: ['42px', { lineHeight: '1.15', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        appleSmall: '8px',
        appleCard: '16px',
        appleModal: '22px',
      },
      maxWidth: {
        apple: '1180px',
      },
      transitionDuration: {
        apple: '180ms',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

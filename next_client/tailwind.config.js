/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        destructive: 'var(--destructive)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
        lg: 'calc(var(--radius) + 2px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: 'var(--shadow-default)',
        card: 'var(--shadow-card)',
      },
    },
  },
};

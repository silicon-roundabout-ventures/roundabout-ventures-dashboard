import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    // Exclude Gatsby-generated type definitions to prevent infinite loops
    "!./src/gatsby-types.d.ts",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        srv: {
          dark: '#000000',          // Pitch black background (VS Code Minimal Dark style)
          darkAlt: '#1E1E1E',       // Secondary dark (editor background)
          panel: '#252526',         // Panel/widget background
          blue: '#61AFEF',          // Terminal blue - for code-like accents
          teal: '#56B6C2',
          'teal-0': 'rgba(86,182,194,0)', // 0% opacity
          'teal-5': 'rgba(86,182,194,0.05)', // 5% opacity
          'teal-10': 'rgba(86,182,194,0.1)', // 10% opacity
          'teal-20': 'rgba(86,182,194,0.2)', // 20% opacity
          'teal-30': 'rgba(86,182,194,0.3)', // 30% opacity
          'teal-40': 'rgba(86,182,194,0.4)', // 40% opacity
          'teal-50': 'rgba(86,182,194,0.5)', // 50% opacity
          'teal-60': 'rgba(86,182,194,0.6)', // 60% opacity
          'teal-80': 'rgba(86,182,194,0.8)', // 80% opacity
          'teal-90': 'rgba(86,182,194,0.9)', // 90% opacity
          light: '#DCDFE4',         // Light text (foreground)
          gray: '#BBBBBB',          // Muted text for less important elements
          pink: '#C678DD',          // Terminal magenta - for code highlights
          yellow: '#E5C07B',        // Terminal yellow - for code highlights
          red: '#E06C75',           // Terminal red - for errors/warnings
          green: '#98C379',         // Terminal green - for success elements
          comment: '#546E7A'        // Comment text color as in VS Code theme
        }
      },
      fontFamily: {
        mono: ['"Source Code Pro"', 'Menlo', 'SF Mono', 'Monaco', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'typing': {
          from: { width: '0' },
          to: { width: '100%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'pulse-slow': 'pulse-slow 3s infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.7s step-end infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

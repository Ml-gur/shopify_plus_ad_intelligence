/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1a365d', // Deep navy (primary) - slate-800
        'secondary': '#2d3748', // Sophisticated charcoal (secondary) - gray-700
        'accent': '#38a169', // Strategic green (accent) - green-600
        
        // Background Colors
        'background': '#f7fafc', // Soft off-white (background) - gray-50
        'surface': '#ffffff', // Pure white (surface) - white
        
        // Text Colors
        'text-primary': '#1a202c', // Near-black (text primary) - gray-900
        'text-secondary': '#4a5568', // Balanced gray (text secondary) - gray-600
        
        // Status Colors
        'success': '#38a169', // Green success indicator - green-600
        'warning': '#ed8936', // Professional orange warning - orange-500
        'error': '#e53e3e', // Clear red error - red-500
        
        // Border Colors
        'border': '#e2e8f0', // Light gray border - gray-200
        'border-hover': '#cbd5e0', // Darker border on hover - gray-300
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        'DEFAULT': '6px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        'elevation-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'elevation-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'elevation-lg': '0 8px 15px -3px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '900': '900',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
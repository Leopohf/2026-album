import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#F7F7F5',   // fondo crema
        surface: '#FFFFFF',   // tarjetas
        ink:     '#1A1A1A',   // texto principal
        muted:   '#9A9A9A',   // texto secundario
        border:  '#E5E5E3',   // bordes
        success: '#2D6A4F',   // verde oscuro para "tengo"
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'xs':  ['12px', '16px'],
        'sm':  ['14px', '20px'],
        'lg':  ['18px', '28px'],
        '4xl': ['32px', '40px'],
      },
    },
  },
  plugins: [],
} satisfies Config;

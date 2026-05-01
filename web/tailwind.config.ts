import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyan-hi': '#00d4ff',
        'cyan-mid': '#0099cc',
        'cyan-deep': '#0077aa',
        'cyan-deeper': '#006688',
        navy: '#0a1628',
        'navy-soft': '#0f1e36',
        'navy-card': '#122544',
        paper: '#f4faff',
        ink: '#061224',
        'ink-soft': '#2a3a52',
        'ink-mute': '#5a6c84',
        'ink-faint': '#8a9bb3',
      },
    },
  },
  plugins: [],
};

export default config;

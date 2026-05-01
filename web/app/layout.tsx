import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: '400',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Dekodd – Everyday Market Intel',
  description:
    "Everyday market intelligence for India's retail investors. We explain what's happening and why — without telling you what to buy.",
  keywords: ['market intelligence', 'stock market India', 'investing education', 'demat account', 'Dekodd'],
  openGraph: {
    title: 'Dekodd – Everyday Market Intel',
    description: "Everyday market intelligence for India's retail investors. Understand what's moving the market in minutes.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

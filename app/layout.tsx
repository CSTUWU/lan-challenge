import type { Metadata } from 'next';
import { Orbitron, Chakra_Petch, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
});

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-chakra',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = {
  title: 'CAMPUS COD4 // LAN WARS 2026',
  description: 'Engage in zero-latency 5v5 tactical warfare. 16 Collegiate teams. Promod ruleset enabled.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${chakraPetch.variable} ${rajdhani.variable} tactical-grid font-tactical antialiased selection:bg-[#ff5a00] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

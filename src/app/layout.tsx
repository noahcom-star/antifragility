import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GEO & SEO Consulting | AI-Powered Growth Strategies',
  description: 'We blend Generative Engine Optimization (GEO) and Search Engine Optimization (SEO) to build growth systems that scale with you — and the AI era.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

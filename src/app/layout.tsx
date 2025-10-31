import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Viral Forge Studio',
  description: 'YouTube Automation Blueprint Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-dark-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}


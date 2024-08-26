import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import DashboardWrapper from '@/app/dashboardWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'AI-driven inventory manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}

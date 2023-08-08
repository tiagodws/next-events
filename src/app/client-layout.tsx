'use client';

import { TopBar } from '@/components/top-bar';
import { Toaster } from '@/components/ui';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { type FC, type ReactNode } from 'react';

type ClientRootLayoutProps = {
  children?: ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const ClientRootLayout: FC<ClientRootLayoutProps> = (props) => {
  const { children } = props;

  return (
    <SessionProvider>
      <TopBar />
      <Toaster />
      <main className={`my-8 ${inter.className}`}>{children}</main>
      <Analytics />
    </SessionProvider>
  );
};

export default ClientRootLayout;

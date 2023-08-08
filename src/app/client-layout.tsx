'use client';

import { NavBar } from '@/components/nav-bar';
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
      <Toaster />
      <main className={`h-full flex flex-col ${inter.className}`}>
        <div className="flex-0">
          <NavBar />
        </div>

        <div className="flex-1 py-8 overflow-auto">{children}</div>
      </main>
      <Analytics />
    </SessionProvider>
  );
};

export default ClientRootLayout;

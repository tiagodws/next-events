import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';
import ClientRootLayout from './client-layout';

type RootLayoutProps = {
  children?: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: 'Next Events',
  description: 'Find interesting events for your personal development!',
  viewport: 'initial-scale=1.0, width=device-width',
};

export default RootLayout;

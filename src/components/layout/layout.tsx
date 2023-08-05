import { Inter } from 'next/font/google';
import { FC, Fragment, ReactNode } from 'react';
import { Toaster } from '../ui';
import { MainHeader } from './main-header';

type LayoutProps = {
  children: ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <MainHeader />
      <Toaster />
      <main className={`mt-8 ${inter.className}`}>{children}</main>
    </Fragment>
  );
};

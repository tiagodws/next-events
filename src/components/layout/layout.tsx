import { FC, Fragment, ReactNode } from 'react';
import { MainHeader } from './main-header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <MainHeader />
      <main className="mt-8">{children}</main>
    </Fragment>
  );
};

import { type FC } from 'react';
import { NavAdmin } from './nav-admin';
import { NavLinks } from './nav-links';
import { NavLogo } from './nav-logo';

export const NavBar: FC = () => {
  return (
    <header className="navbar justify-between bg-default shadow-sm">
      <div className="flex flex-1 justify-start">
        <NavLogo />
      </div>

      <div className="flex justify-center mx-4">
        <NavLinks />
      </div>

      <div className="flex flex-1 justify-end">
        <NavAdmin />
      </div>
    </header>
  );
};
